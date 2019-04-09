import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import fetch from '../../fetch/axios'
import { connect } from 'react-redux'
import { searchCreators } from '../../store/actions'
import landingImage from '../../assets/images/landing-image.jpg'
// JSX
import { withErrorHandler } from '../../hoc/ErrorHandler/withErrorHandler'
import {
  Wrapper,
  Container,
  Title,
  Background,
  ImageWrapper,
  FormContainer
} from './styled-components'
import { Form, Input } from 'react-formalized'
import Button from 'react-png-button'
import SearchResults from '../SearchResults/SearchResults'
import { Icon } from 'react-svg-library'
import { LazyLoadImage } from 'react-lazy-load-image-component'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const landing = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmitHandler = (event, formState) => {
    event.preventDefault()
    const params = {
      artist: formState && formState.artist && formState.artist.value,
      track: formState && formState.track && formState.track.value
    }
    // Only fetch if any of them exist.
    if (params.artist || params.track) {
      fetchResults(params)
    }
  }

  const fetchResults = async (params) => {
    await setIsLoading(true)
    try {
      const response = await fetch.get('', {
        params: {
          ...params
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      props.setSearch && await props.setSearch(params, response.data)
      await setIsLoading(false)
    } catch (error) {
      await console.log(error)
      await setIsLoading(false)
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
    <Wrapper>
      <Container>
        <Background>
          <ImageWrapper>
            <LazyLoadImage
              alt=''
              src={landingImage} />
          </ImageWrapper>
          <FormContainer>
            <Title>Look anything up in Discogs' largest online music database on the web</Title>
            <Form onSubmit={onSubmitHandler}>
              <Input
                identifier='artist'
                placeholder='Artist' />
              <Input
                identifier='track'
                placeholder='Song' />
              <Button
                disabled={isLoading}
                style={{
                  marginTop: '9px'
                }}
                blockButton
                type='submit'
                button='danger'>
                {isLoading ? <Icon size='2em' icon='loading-two' /> : 'Search'}
              </Button>
            </Form>
          </FormContainer>
        </Background>
        <SearchResults isLoading={isLoading} />
      </Container>
    </Wrapper>
  )
}

landing.propTypes = {
  setSearch: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data))
  }
}

export default withErrorHandler(connect(null, mapDispatchToProps)(landing), fetch)
