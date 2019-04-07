import React from 'react'
import axios from '../../axios/axios'
// JSX
import {
  Wrapper,
  Container,
  Title,
  FormContainer
} from './styled-components'
import { Form, Input } from 'react-formalized'
import Button from 'react-png-button'
import SearchResults from '../../components/UI/SearchResults/SearchResults'

const app = () => {
  const onSubmitHandler = (event, formState) => {
    event.preventDefault()
    console.log('app onSubmitHandler formState', formState)
    const params = {
      artist: formState && formState.artist && formState.artist.value,
      album: formState && formState.album && formState.album.value
    }
    // Only fetch if any of them exist.
    console.log('app onSubmitHandler params', params)
    if (params.artist || params.album) {
      fetchResults(params)
    } 
  }

  const fetchResults = async (params) => {
    try {
      const response = await axios.get('', {
        params: {
          ...params
        }
      })
      console.group('fetchResults', response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <Container>
        <Title>Search for anything in Discogs' largest online music database on the web</Title>
        <FormContainer>
          <Form onSubmit={onSubmitHandler}>
            <Input
              identifier='artist'
              required
              placeholder='Artist' />
            <Input
              identifier='album'
              placeholder='Album' />
            <Button
              style={{
                marginTop: '9px'
              }}
              blockButton
              type='submit'
              button='primary'>
              Search
            </Button>
          </Form>
        </FormContainer>
        <SearchResults />
      </Container>
    </Wrapper>
  )
}

export default app
