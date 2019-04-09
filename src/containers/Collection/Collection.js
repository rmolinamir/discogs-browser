import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import collection, { allId } from '../../collection/axios'
import { connect } from 'react-redux'
import { collectionCreators } from '../../store/actions'
import collectionImage from '../../assets/images/collection-image.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// JSX
import {
  Wrapper,
  Container,
  Background,
  ImageWrapper,
  Title
} from './styled-components'
import CollectionReleases from '../CollectionReleases/CollectionReleases'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const userCollection = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchCollection = async () => {
    await setIsLoading(true)
    try {
      const response = await collection.get(`/${allId}/releases`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      props.setCollection && await props.setCollection(response.data)
      await setIsLoading(false)
    } catch (error) {
      await console.error(error)
      await setIsLoading(false)
    }
  }

  /**
   * Sets the collection when mounting and cancels
   * any pending promises when unmounting.
   */
  React.useEffect(() => {
    fetchCollection()
    return () => {
      cancel && cancel('Request cancelled by the user.')
    }
  }, [])

  return (
    <Wrapper>
      <Container>
        <Background>
          <ImageWrapper>
            <LazyLoadImage
              alt=''
              src={collectionImage} />
          </ImageWrapper>
          <Title>My <span>collection</span></Title>
        </Background>
        <CollectionReleases isLoading={isLoading} />
      </Container>
    </Wrapper>
  )
}

userCollection.propTypes = {
  setCollection: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCollection: (data) => dispatch(collectionCreators.setCollection(data))
  }
}

export default connect(null, mapDispatchToProps)(userCollection)
