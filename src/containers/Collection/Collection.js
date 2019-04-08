import React from 'react'
import axios from 'axios'
import collection, { allId } from '../../collection/axios'
import { connect } from 'react-redux'
import { searchCreators } from '../../store/actions'
// JSX
import {
  Wrapper,
  Container,
  Title
} from './styled-components'
import CollectionResults from '../CollectionResults/CollectionResults'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const component = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchCollection = async (params) => {
    await setIsLoading(true)
    try {
      const response = await collection.get(`/${allId}/releases`, {
        params: {
          ...params
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      console.log('fetchCollection response', response)
      // props.setSearch && await props.setSearch(params, response.data)
      await setIsLoading(false)
    } catch (error) {
      await console.log(error);
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
        <Title>Search for anything in Discogs' largest online music database on the web</Title>
        <CollectionResults isLoading={isLoading} />
      </Container>
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data))
	}
}

export default connect(null, mapDispatchToProps)(component)
