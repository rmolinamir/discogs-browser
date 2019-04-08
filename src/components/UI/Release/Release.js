import React from 'react'
import image_not_found from '../../../assets/images/not_found_image.svg'
import axios from 'axios'
import collection, { uncategorizedId } from '../../../collection/axios'
// CSS
import modalCSS from './Modal.module.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
import {
  Title,
  Release,
  Container,
  MoreInformation,
  StyledImage,
  Text
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

const release = (props) => {
  const {
    cover_image,
    id,
    thumb,
    title,
    user_data,
    year
  } = props

  const [isModalOpen, setModalOpen] = React.useState(false)
  const [releaseCollection, setReleaseCollection] = React.useState(user_data && user_data.in_collection)
  const [isSettingCollection, setSettingCollection] = React.useState(false)

  const addToCollection = async () => {
    await setSettingCollection(true)
    try {
      /**
       * **NOTE:** If the `type` of the release is a `master`, we must get the `type` of the **main release ID**.
       * Otherwise if the `type` is a `release` then it's fine to use its ID.
       */
      const response = await collection.post(`/${uncategorizedId}/releases/${id}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      // Delay 500ms, for a bit of smoothness.
      await new Promise(_ => setTimeout(_, 500))
      await setReleaseCollection(response.data)
      await setSettingCollection(false)
    } catch {
      await setSettingCollection(false)
    }
  }

  const removeFromCollection = async () => {
    await setSettingCollection(true)
    try {
      const instanceId = releaseCollection ? releaseCollection.instance_id : id
      await collection.delete(`/${uncategorizedId}/releases/${id}/instances/${instanceId}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      // Delay 500ms, for a bit of smoothness.
      await new Promise(_ => setTimeout(_, 500))
      await setReleaseCollection(undefined)
      await setSettingCollection(false)
    }
    catch {
      await setSettingCollection(false)
    }
  }

  /**
   * If the release is in the collection then `removeFromCollection` will execute.
   * Othewise `addToCollection` is executed.
   */
  const collectionHandler = () => {
    /**
     * If `cancel` exists, it means there is a promise pending. It is best to cancel it
     * to reduce the amount of unnecessary requests.
     */
    cancel && cancel('New collection request made by the user.')
    switch(Boolean(releaseCollection)) {
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
      {id && (
        <Modal
          className={modalCSS.Aesthetics}
          closeModal={() => setModalOpen(false)}
          open={isModalOpen}>
          <ModalContent
            open={isModalOpen}
            collectionHandler={collectionHandler}
            isReleaseInCollection={Boolean(releaseCollection)}
            isSettingCollection={isSettingCollection}
            {...props} />
        </Modal>
      )}
      <Release onClick={() => setModalOpen(true)}>
        <StyledImage>
          {id && (
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
          <Text>Release</Text>
        </Container>
      </Release>
    </>
  )
}

export default release
