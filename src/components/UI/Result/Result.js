import React from 'react'
import styled from 'styled-components'
// JSX
import LazyImage from '../LazyImage/LazyImage'

const Result = styled.div`
  display: inline-block;
  position: relative;
  height: 250px;
  width: 100%;
  max-width: 225px;
  margin: 0 auto;
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
      <LazyImage src={thumb || cover_image} />
    </Result>
  )
}

export default result
