import React from 'react'
import axios from '../../axios/axios'
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

const landing = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmitHandler = (event, formState) => {
    event.preventDefault()
    const params = {
      artist: formState && formState.artist && formState.artist.value,
      album: formState && formState.album && formState.album.value
    }
    // Only fetch if any of them exist.
    if (params.artist || params.album) {
      fetchResults(params)
    } 
  }

  const fetchResults = async (params) => {
    await setIsLoading(true)
    try {
      const response = await axios.get('', {
        params: {
          ...params
        }
      })
      props.setSearch && await props.setSearch(params, response.data)
    await setIsLoading(false)
  } catch (error) {
      await console.log(error);
    await setIsLoading(false)
  }
  }

  return (
    <Wrapper>
      <Container>
        <FormContainer>
          <Form onSubmit={onSubmitHandler}>
            <Input
              identifier='artist'
              placeholder='Artist' />
            <Input
              identifier='album'
              placeholder='Album' />
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
        <SearchResults />
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
