import React from 'react'
import axios from 'axios'
// CSS
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
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
  Community,
  Loading,
  FadeIn,
  Rating,
  YoutubeVideo
} from './styled-components'
import { Icon } from 'react-svg-library'
import Divider from '../../Divider/Divider'
import image_not_found from '../../../../assets/images/not_found_image.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const modalContent = (props) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState(undefined)

  const myYoutubeVideo = React.useRef(null)

  const {
    community,
    country,
    cover_image,
    format,
    genre,
    label,
    master_url,
    style,
    thumb,
    title,
    user_data,
    year,
    type
  } = props

  const fetchData = async () => {
    try {
      const response =  master_url && await axios.get(master_url)
      const data = await {
        community: response&& response.data && response.data.community,
        tracklist: response && response.data.tracklist && response.data.tracklist[0],
        video: response && response.data.videos && response.data.videos[0]
      }
      await setData(data)
      // Delay 1000ms, for a bit of smoothness.
      await new Promise(_ => setTimeout(_, 1000))
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
        func: 'stopVideo',
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
                alt={image_not_found}
                placeholderSrc={props.placeholder || thumb}
                src={cover_image}
                wrapperClassName='gallery-img-wrapper' />
            </StyledImage>
            </ImageContainer>
        </Cover>
        <Container>
          <Header>
            <Subtitle>{type}</Subtitle>
            <Subtitle>{year}</Subtitle>
            {/* Only show if label data is available. */}
            {label && label.length && (
              <Subtitle>{label.join(', ')}.</Subtitle>
            )}
            <Title>{title}</Title>
          </Header>
          <Divider height='24px' />
          {/* Only show the following props if they are available. */}
          {country && country.length && (
            <Text>Country: <span>{country}.</span></Text>
          )}
          {format && format.length && (
            <Text>Available on: <span>{format.join(', ')}.</span></Text>
          )}
          {genre && genre.length && (
            <Text>Genre: <span>{genre.join(', ')}.</span></Text>
          )}
          {style && style.length && (
            <Text>Style: <span>{style.join(', ')}.</span></Text>
          )}
          <Divider height='32px' />
          {/* Protection for  empty objects. */}
          {community && (
            <div>
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
            </div>
          )}
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
              {/* Only display the following components, if their respective information exists. */}
              {data.community && data.community.rating && (
              <Rating>
                Community rating:
                <div>
                  {/* Needs to be dismounted to avoid clipPath conflicts. */}
                  {props.open && (
                    <Icon
                      clipPathFill={Number(data.community.rating.average / 5) + 0.01}
                      icon='star-icon' />
                  )}
                  <span>{Number(data.community.rating.average).toFixed(0)} / 5</span>
                </div>
              </Rating>
              )}
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

export default React.memo(modalContent)
