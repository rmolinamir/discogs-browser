import React from 'react'
import image_not_found from '../../../assets/images/not_found_image.svg'
import axios from 'axios'
import collection from '../../../collection/axios'
// CSS
import modalCSS from './Modal.module.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
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
  console.log('result', props)
  const {
    community,
    cover_image,
    id,
    thumb,
    title,
    user_data,
    year,
    type
  } = props

  const [isModalOpen, setModalOpen] = React.useState(false)
  const [resultCollection, setResultCollection] = React.useState(user_data && user_data.in_collection)
  const [isSettingCollection, setSettingCollection] = React.useState(false)

  const addToCollection = async () => {
    await setSettingCollection(true)
    try {
      const response = await collection.post(`/releases/${id}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      console.log('addToCollection response', response)
      // Delay 500ms, for a bit of smoothness.
      await new Promise(_ => setTimeout(_, 500))
      await setResultCollection(response.data)
      await setSettingCollection(false)
    } catch {
      await setSettingCollection(false)
    }
  }

  const removeFromCollection = async () => {
    await setSettingCollection(true)
    try {
      const instanceId = resultCollection ? resultCollection.instance_id : id
      await collection.delete(`/releases/${id}/instances/${instanceId}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      // Delay 500ms, for a bit of smoothness.
      await new Promise(_ => setTimeout(_, 500))
      await setResultCollection(undefined)
      await setSettingCollection(false)
    }
    catch {
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
    switch(Boolean(resultCollection)) {
      case true:
        removeFromCollection()
        break
      case false:
      default:
        addToCollection()
    }
  }

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
            isResultInCollection={Boolean(resultCollection)}
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
            alt={image_not_found}
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

export default result
