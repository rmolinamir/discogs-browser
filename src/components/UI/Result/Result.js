/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import imageNotFound from '../../../assets/images/not_found_image.svg'
import axios from 'axios'
import collection, { uncategorizedId, byRelease } from '../../../collection/axios'
import { toast } from 'react-toastify'
// CSS
import modalCSS from './Modal.module.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
import { withErrorHandler } from '../../../hoc/ErrorHandler/withErrorHandler'
import {
  Title,
  Result,
  Container,
  MoreInformation,
  StyledImage,
  Text,
  Community
} from './styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Icon } from 'react-svg-library'
import Modal from 'react-png-modal'
import ModalContent from './ModalContent/ModalContent'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const result = (props) => {
  const {
    community,
    cover_image,
    id,
    master_url,
    thumb,
    title,
    user_data,
    year,
    type,
    collectionReleases
  } = props

  const [isModalOpen, setModalOpen] = React.useState(false)
  const [resultInstanceId, setResultInstanceId] = React.useState(undefined)
  const [isSettingCollection, setSettingCollection] = React.useState(true)

  /**
   * If the `type` of the result is `master`, then we need to do a request to save the
   * actual release ID.
   */
  const getReleaseId = async () => {
    try {
      const response = await axios.get(master_url, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      return response.data.main_release
    } catch {
      return new Error()
    }
  }

  const addToCollection = async () => {
    await setSettingCollection(true)
    try {
      /**
       * **NOTE:** If the `type` of the result is a `master`, we must get the `type` of the **main release ID**.
       * Otherwise if the `type` is a `release` then it's fine to use its ID.
       */
      const releaseId = type === 'release' ? id : await getReleaseId()
      const response = await collection.post(`/${uncategorizedId}/releases/${releaseId}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      // Delay 500ms, for a bit of smoothness.
      await new Promise(resolve => setTimeout(resolve, 500))
      await setResultInstanceId(response.data.instance_id)
      await toast.success(`${title} has been successfully added to your collection!`)
      await setSettingCollection(false)
    } catch {
      await setSettingCollection(false)
    }
  }

  const removeFromCollection = async () => {
    await setSettingCollection(true)
    try {
      const instanceId = resultInstanceId || id
      await collection.delete(`/${uncategorizedId}/releases/${id}/instances/${instanceId}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      // Delay 500ms, for a bit of smoothness.
      await new Promise(resolve => setTimeout(resolve, 500))
      await setResultInstanceId(undefined)
      await toast.error(`You have successfully removed ${title} from your collection.`)
      await setSettingCollection(false)
    } catch {
      await setSettingCollection(false)
    }
  }

  /**
   * If the result is in the collection then `removeFromCollection` will execute.
   * Othewise `addToCollection` is executed.
   */
  const collectionHandler = () => {
    /**
     * If `cancel` exists, it means there is a promise pending. It is best to cancel it
     * to reduce the amount of unnecessary requests.
     */
    cancel && cancel('New collection request made by the user.')
    switch (Boolean(resultInstanceId)) {
      case true:
        removeFromCollection()
        break
      case false:
      default:
        addToCollection()
    }
  }

  /**
   * Gets the instance ID depending if the type of the result is `release` or `master`.
   */
  const getInstanceId = async () => {
    if (!collectionReleases.length) {
      return undefined
    }
    if (user_data && user_data.in_collection) {
      if (type === 'release') {
        const collectionRelease = await collectionReleases.find(release => release.id === id)
        return collectionRelease && setResultInstanceId(collectionRelease.instance_id)
      }
      const resultId = await getReleaseId() // This is this result's release ID.
      const collectionRelease = await byRelease.get(`/${resultId}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      const instanceId = await collectionRelease.data.releases.length && collectionRelease.data.releases[0].instance_id
      return collectionRelease && setResultInstanceId(instanceId)
    }
    return undefined
  }

  /**
   * Sets the instanceId after `props.collectionReleases` has been set in the redux store.
   */
  React.useEffect(() => {
    if (props.collectionReleases && props.collectionReleases.length) {
      setSettingCollection(false)
      getInstanceId()
    }
  }, [props.collectionReleases])

  /**
   * Cancels any pending promises when unmounting.
   */
  React.useEffect(() => {
    return () => {
      cancel && cancel('Request cancelled by the user.')
    }
  }, [])

  return (
    <>
      {user_data && (
        <Modal
          className={modalCSS.Aesthetics}
          closeModal={() => setModalOpen(false)}
          open={isModalOpen}>
          <ModalContent
            open={isModalOpen}
            collectionHandler={collectionHandler}
            isResultInCollection={Boolean(resultInstanceId)}
            isSettingCollection={isSettingCollection}
            {...props} />
        </Modal>
      )}
      <Result onClick={() => setModalOpen(true)}>
        <StyledImage>
          {user_data && (
            <MoreInformation>
              <Icon size='50%' icon='show' />
            </MoreInformation>
          )}
          <LazyLoadImage
            className='gallery-img'
            effect='blur'
            width={'100%'}
            height={205}
            alt={imageNotFound}
            placeholderSrc={props.placeholder || thumb}
            src={cover_image}
            wrapperClassName='gallery-img-wrapper' />
        </StyledImage>
        <Container>
          <Title>{title}</Title>
          <Text>{year}</Text>
          <Text>{type}</Text>
          {/* Protection for  empty objects. */}
          {community && (
            <>
              <Community style={{
                color: '#EDCE21'
              }}>
                <span>{community.have}</span>
                <Icon icon='bullet-checkmark-no-bg' />
              </Community>
              <Community style={{
                color: '#C45A5A'
              }}>
                <span>{community.want}</span>
                <Icon icon='like' />
              </Community>
            </>
          )}
        </Container>
      </Result>
    </>
  )
}

result.propTypes = {
  community: PropTypes.object,
  cover_image: PropTypes.string,
  id: PropTypes.number,
  master_url: PropTypes.string,
  thumb: PropTypes.string,
  title: PropTypes.string,
  user_data: PropTypes.object,
  year: PropTypes.string,
  type: PropTypes.string,
  collectionReleases: PropTypes.array,
  placeholder: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    collectionReleases: state.collectionReducer && state.collectionReducer.releases
  }
}

export default withErrorHandler(connect(mapStateToProps)(result), collection)
