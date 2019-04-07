import React from 'react'
import styled from 'styled-components'
import image_not_found from '../../../assets/images/not_found_image.svg'
// CSS
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Icon } from 'react-svg-library'

const Title = styled.div`
  padding: 3px 0 3px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 200ms ease-in-out;
`

const Result = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  max-width: 225px;
  width: 100%;
  height: 285px;
  margin: 0 auto;

  :hover span {
    transform: scale(1);
  }
  
  :hover ${Title} {
    color: #116FFC;
  }
`

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`

const StyledImage = styled.span`
  display: inline-block;
  background-image: url(${image_not_found});
  background-size: 100% 100%;
  color: transparent;
  width: 100%;
  height: 205px;
  transition: all 200ms ease-in-out;
  transform: scale(0.95);
`

const Year = styled.div`
  padding: 3px 0 3px;
  font-weight: 200;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 200ms ease-in-out;
`

const Community = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 3px 1ch 3px 0px;
  font-weight: 600;
  font-size: 1em;

  span {
    margin-right: 3px;
  }

  svg {
  }
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
          placeholderSrc={props.placeholder || thumb}
          src={cover_image}
          wrapperClassName="gallery-img-wrapper" />
      </StyledImage>
      <Container>
        <Title>{title}</Title>
        <Year>{year}</Year>
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
  )
}

export default result
