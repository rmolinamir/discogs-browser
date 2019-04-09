/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import imageNotFound from '../../../../assets/images/not_found_image.svg'
// CSS
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
import { withErrorHandler } from '../../../../hoc/ErrorHandler/withErrorHandler'
import {
  Wrapper,
  Cover,
  ImageContainer,
  StyledImage,
  Container,
  Header,
  Subtitle,
  Title,
  Text,
  Loading,
  FadeIn,
  YoutubeVideo
} from './styled-components'
import { Icon } from 'react-svg-library'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Button from 'react-png-button'
import Divider from '../../Divider/Divider'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const modalContent = (props) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState(undefined)

  const myYoutubeVideo = React.useRef(null)

  const {
    cover_image,
    master_url,
    thumb,
    title
  } = props

  const fetchData = async () => {
    /**
     * If `cancel` exists, it means there is a promise pending. It is best to cancel it
     * to reduce the amount of unnecessary requests.
     */
    cancel && cancel('New search done by the user.')
    try {
      const response = master_url && await axios.get(master_url, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      const data = await {
        community: response && response.data && response.data.community,
        tracklist: response && response.data.tracklist && response.data.tracklist[0],
        video: response && response.data.videos && response.data.videos[0]
      }
      await setData(data)
      // Delay 1000ms, for a bit of smoothness.
      await new Promise(resolve => setTimeout(resolve, 200))
      await setIsLoading(false)
    } catch {
      await setIsLoading(false)
    }
  }

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\v=)([^#\\?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return match[2]
    }
  }

  /**
   * `pauseYoutubeVideo` will stop all YouTube videos when the modal closes.
   */
  const pauseYoutubeVideo = () => {
    // Protection against empty object reference.
    if (!myYoutubeVideo && !myYoutubeVideo.current) {
      return
    }
    const iframe = myYoutubeVideo.current
    // Check for null objects, just in case.
    iframe.contentWindow && iframe.contentWindow.postMessage && iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'stopVideo'
      }),
      '*'
    )
  }

  /**
   * **Only** fetch the data if the modal has been opened,
   * and only once if the data is `undefined`.
   */
  React.useEffect(() => {
    const shouldFetchData = props.open && Boolean(master_url)
    if (!data && shouldFetchData) {
      fetchData()
    }
    // Pauses videos whenever the modal closes.
    if (!props.open && myYoutubeVideo && myYoutubeVideo.current) {
      pauseYoutubeVideo()
    }
  }, [props.open])

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
      <Wrapper>
        <Cover>
          <ImageContainer>
            <StyledImage>
              <LazyLoadImage
                className='gallery-img'
                effect='blur'
                width='100%'
                height='100%'
                alt={imageNotFound}
                placeholderSrc={props.placeholder || thumb}
                src={cover_image}
                wrapperClassName='gallery-img-wrapper' />
            </StyledImage>
          </ImageContainer>
        </Cover>
        <Container>
          <Header>
            <Subtitle>Release</Subtitle>
            <Title>{title}</Title>
          </Header>
          <Divider height='24px' />
          {/**
           * This button handles adding or removing the release from the collection.
           * Only render this button if the `type` of the release is a `master` or a `release`.
          */}
          <Button
            style={{
              marginTop: '6px'
            }}
            blockButton
            onClick={props.collectionHandler}
            disabled={props.isSettingCollection}
            button={!props.isReleaseInCollection ? 'success' : 'danger'}>
            {props.isSettingCollection ? (
              <Icon icon='loading-one' />
            ) : (
              !props.isReleaseInCollection ? 'Add to my collection' : 'Remove from my collection'
            )}
          </Button>
          <Divider height='32px' />
          {/* The rest of the information is only loaded if master_url exist. */}
          {Boolean(master_url) && isLoading && (
            <Loading>
              <Icon
                size='80px'
                icon='loading-two' />
            </Loading>
          )}
          {data && !isLoading && (
            <FadeIn>
              {data.tracklist && data.tracklist.duration && (
                <Text>Duration: <span>{data.tracklist.duration}</span></Text>
              )}
            </FadeIn>
          )}
        </Container>
        {/* YouTube Video */}
      </Wrapper>
      {data && !isLoading && (
        data.video && data.video.uri && (
          <FadeIn>
            <Divider height='32px' />
            <Title>{data.video.title}</Title>
            <YoutubeVideo>
              <iframe
                allowFullScreen
                ref={myYoutubeVideo}
                title={data.video.title}
                about={data.video.description}
                type='text/html'
                width='100%'
                height='480px'
                // The string '?enablejsapi=1' needs to be added to allow JavaScript to pause the video.
                src={`//www.youtube.com/embed/${getYoutubeVideoId(data.video.uri)}?enablejsapi=1`}
                frameBorder='0' />
            </YoutubeVideo>
          </FadeIn>
        )
      )}
    </>
  )
}

modalContent.propTypes = {
  cover_image: PropTypes.string,
  master_url: PropTypes.string,
  thumb: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  collectionHandler: PropTypes.func,
  isSettingCollection: PropTypes.bool,
  isReleaseInCollection: PropTypes.bool
}

export default withErrorHandler(React.memo(modalContent), axios)
