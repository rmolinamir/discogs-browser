import React from 'react'
import styled from 'styled-components'
import image_not_found from '../../../assets/images/not_found_image.svg'
// JSX
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'

const Result = styled.div`
  display: inline-block;
  position: relative;
  max-width: 225px;
  width: 100%;
  height: 250px;
  margin: 0 auto;
`

const StyledImage = styled.span`
  display: inline-block;
  background-image: url(${image_not_found});
  background-size: 100% 100%;
  color: transparent;
  height: 205px;
  width: 100%;
`

const result = (props) => {
  // console.log(props)
  const {
    community,
    country,
    cover_image,
    genre,
    master_url,
    thumb,
    title,
    uri,
    user_data,
    year
  } = props
  return (
    <Result>
      <StyledImage>
        <LazyLoadImage
            className="gallery-img"
            effect="blur"
            width={'100%'}
            height={205}
            alt={image_not_found}
            placeholderSrc={thumb}
            src={cover_image}
            wrapperClassName="gallery-img-wrapper" />
      </StyledImage>
    </Result>
  )
}

export default result
