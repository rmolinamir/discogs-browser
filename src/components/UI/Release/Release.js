import React from 'react'
import { connect } from 'react-redux'
import image_not_found from '../../../assets/images/not_found_image.svg'
import axios from 'axios'
import collection, { uncategorizedId, allId } from '../../../collection/axios'
import { collectionCreators } from '../../../store/actions'
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
    year,
    currentPage,
    pageCount,
    totalReleases,
    setCollection,
    instance_id
  } = props

  const [isModalOpen, setModalOpen] = React.useState(false)
  const [releaseCollection] = React.useState(instance_id)
  const [isSettingCollection, setSettingCollection] = React.useState(false)

  /**
   * To smoothly remove the item from collection, `removeFromCollection` will:
   * 1. Set the loading state as `true`.
   * 2. Send the axios delete request and then afterwards execute a new request to fetch
   *    the new pagination data, and releases. The newly selected page (which is either the
   *    current one or the previous one depending on the amount of items and currentPage)
   *    is also sent to calculate the appropriate releases.
   * 3. Dismount modal.
   * 4. Delay 200ms to smooth the unmounting transition/animation.
   * 5. Update the current new pagination and releases, component unmounts here.
   */
  const removeFromCollection = async () => {
    await setSettingCollection(true)
    try {
      await collection.delete(`/${uncategorizedId}/releases/${id}/instances/${instance_id}`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      const isOnLastPage = await currentPage === pageCount
      const isLastReleaseOnPage = await totalReleases === 1
      // The new page will be either the current page, or one page less if it's the last release.
      const newPage = await (isOnLastPage && isLastReleaseOnPage) ? currentPage - 1 : currentPage
      const response = await collection.get(`/${allId}/releases`, {
        params: {
          page: newPage
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      await setModalOpen(false)
      // Delay 200ms, for a bit of smoothness and let the modal close.
      await new Promise(_ => setTimeout(_, 100))
      await console.log('response data', response.data)
      await setCollection && setCollection(response.data)
      // At this point, the component unmounts.
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
    removeFromCollection()
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

const mapDispatchToProps = (dispatch) => {
	return {
		setCollection: (data) => dispatch(collectionCreators.setCollection(data))
	}
}


export default connect(null, mapDispatchToProps)(release)