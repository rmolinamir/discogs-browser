import React from 'react'
import image_not_found from '../../../assets/images/no_image_found.png'
import styled from 'styled-components'
// JSX
import { Icon } from 'react-svg-library'

const StyledImage = styled.div`
  width: ${props => props.height ? props.width + 'px' : '100%'};
  height: ${props => props.height ? props.height + 'px' : '100%'};
  transition: filder 1s ease;
  filter: ${props => !props.isLoaded ? 'blur(3px)' : 'unset'};
  background-image: url(${props => props.src});
  background-position: 50% 50%;
  background-size: cover;
  background-origin: border-box;
  box-sizing: border-box;
`

const lazyImage = ({src, ...props}) => {
  const [state, setState] = React.useState({
    src: image_not_found,
    loaded: false
  })

  // Will only run when mounted.
  const loadImage = () => {
    console.log('inside setImage')
    const img = new Image()

    img.onload = () => {
      console.log(img)
      // Loads the image and switches it for the placeholder.
      setState({
        src: img.src,
        loaded: true
      })
    }

    // Sets the source to the non-blurred version of the image.
    img.src = props.src
  }

  React.useEffect(() => {
    loadImage()
  }, [true])

  return (
    <StyledImage {...props} {...state} />
  )
}

export default lazyImage
