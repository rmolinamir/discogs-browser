import React from 'react'
import axios from 'axios'
import fetch from '../../fetch/axios'
import { connect } from 'react-redux'
import { searchCreators } from '../../store/actions'
// JSX
import {
  Wrapper,
  Container,
  Title,
  FormContainer
} from './styled-components'
import { Form, Input } from 'react-formalized'
import Button from 'react-png-button'
import SearchResults from '../SearchResults/SearchResults'
import { Icon } from 'react-svg-library'

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
          cancel = c;
        })
      })
      props.setSearch && await props.setSearch(params, response.data)
      await setIsLoading(false)
    } catch (error) {
      await console.log(error);
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
        <FormContainer>
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
              button='primary'>
              {isLoading ? <Icon size='2em' icon='loading-two' /> : 'Search'}
            </Button>
          </Form>
        </FormContainer>
        <Title>Search for anything in Discogs' largest online music database on the web</Title>
        <SearchResults isLoading={isLoading} />
      </Container>
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data))
	}
}

export default connect(null, mapDispatchToProps)(landing)