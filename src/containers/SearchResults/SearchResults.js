import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import axiosInstance from '../../axios/axios'
import { searchCreators } from '../../store/actions'
// JSX
import { 
  Wrapper,
  Loading,
  Title,
  PrevButton,
  NextButton,
  Container,
  Results
} from './styled-components'
import Result from '../../components/UI/Result/Result'
import ReactPaginate from 'react-paginate'
import { Icon } from 'react-svg-library'
import Divider from '../../components/UI/Divider/Divider'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const app = (props) => {
  const [paginationData, setPaginationData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  const paginationDataHandler = (data) => {
    setPaginationData({ ...data })
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (Boolean(props.data && props.data.pagination && props.data.results)) {
      const { pagination } = props.data
      paginationDataHandler(pagination)
    }
  }, [props.data])

  const onPageChangeHandler = async (pageObjectData) => {
      const selectedPage = pageObjectData.selected + 1
      console.log('selectedPage', selectedPage)
      /**
     * If `cancel` exists, it means there is a promise pending. It is best to cancel it
     * to reduce the amount of unnecessary requests.
     */
    cancel && cancel('New search done by the user.')
    if (paginationData) {
      await setIsLoading(true)
      const response = await axiosInstance.get('', {
        params: {
          ...props.searchParams,
          page: selectedPage
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      await props.updateSearch && props.updateSearch(response.data)
      await setIsLoading(false)
      
    }
  }

  const setResults = (results) => {
    return results.map(result => {
      return (
        <Result
          key={result.id}
          {...result} />
      )
    })
  }

  const searchResults = props.data && props.data.results && setResults(props.data.results)

  return (
    <Wrapper>
      {props.searchQuery && (
        <>
          <Title>Search results for: {props.searchQuery}</Title>  
          <Divider height='32px' />
          <ReactPaginate
            pageCount={paginationData && paginationData.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={onPageChangeHandler}
            previousLabel={<PrevButton><Icon icon='arrow-right' /></PrevButton>}
            nextLabel={<NextButton><Icon icon='arrow-right' /></NextButton>}
            breakLabel={'•••'}
            breakClassName={'break'}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'} />
        </>
      )}
      <Container>
        {isLoading ? (
          <Loading>
            <Icon
              size='100%'
              animationFill={[
                '#00407C',
                '#0364BF',
                '#0364BF',
                '#4BA7FC'
              ]}
              icon='loading-one' />
          </Loading>
        ) : (
          <Results>
            {searchResults}
          </Results>
        )}
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
	return {
    searchQuery: state.searchesReducer && state.searchesReducer.searchQuery,
    searchParams: state.searchesReducer && state.searchesReducer.searchParams,
    data: state.searchesReducer && state.searchesReducer.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearch: (data) => dispatch(searchCreators.updateSearch(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(app)