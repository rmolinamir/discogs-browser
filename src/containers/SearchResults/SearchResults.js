import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import fetch from '../../fetch/axios'
import { searchCreators } from '../../store/actions'
import loadingSVG from '../../assets/images/loading.svg'
// JSX
import {
  Wrapper,
  Loading,
  Title,
  PrevButton,
  NextButton,
  Container,
  Results,
  NoResults
} from './styled-components'
import Result from '../../components/UI/Result/Result'
import ReactPaginate from 'react-paginate'
import { Icon } from 'react-svg-library'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const searchResults = (props) => {
  /**
   * To scroll up after evey search.
   */
  const myContainer = React.useRef(null)

  const [paginationData, setPaginationData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [areResultsLoading, setResultsLoading] = React.useState(true)

  const scrollToTop = () => {
    if (myContainer && myContainer.current) {
      const currentScrollPosition = window.pageYOffset
      const desiredScrollPosition = myContainer.current.offsetTop - 56
      if (currentScrollPosition > desiredScrollPosition) {
        window.scroll({
          top: desiredScrollPosition, // -64 to account for the margin and padding on top.
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }

  const onPageChangeHandler = async (pageObjectData) => {
    const selectedPage = pageObjectData.selected + 1
    /**
     * If `cancel` exists, it means there is a promise pending. It is best to cancel it
     * to reduce the amount of unnecessary requests.
     */
    cancel && cancel('New page selected by the user.')
    if (paginationData) {
      await setResultsLoading(true)
      await scrollToTop()
      const response = await fetch.get('', {
        params: {
          ...props.searchParams,
          page: selectedPage
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c
        })
      })
      await props.updateSearch && props.updateSearch(response.data)
      await setResultsLoading(false)
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

  const placeholderResults = React.useMemo(() => {
    const emptyArray = Array.from(new Array(20))
    return emptyArray.map((_, index) => {
      return (
        <Result
          key={index}
          placeholder={loadingSVG}
          cover_image={loadingSVG}
          thumb={loadingSVG} />
      )
    })
  }, [])

  const paginationDataHandler = (data) => {
    setPaginationData({ ...data })
    setIsLoading(false)
    setResultsLoading(false)
  }

  /**
   * Every time the data changes means there was a change in the page.
   * If so, then the pagination component will be updated appropriately.
   */
  React.useEffect(() => {
    if (props.data && props.data.pagination && props.data.results) {
      const { pagination } = props.data
      paginationDataHandler(pagination)
    }
  }, [props.data])

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
      {props.searchQuery ? (
        <>
          {/* Depending on the route, the title will be different. */}
          <Title>Search results for: <span>{props.searchQuery}</span></Title>
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
      ) : (
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
      )}
      <Container ref={myContainer}>
        {isLoading ? (
          <Results>
            {placeholderResults}
          </Results>
        ) : (
          /**
           * Only show the placeholder elements if the results are being fetched either by the form, or by
           * changing pages.
           */
          areResultsLoading || props.isLoading ? (
            <Results>
              {placeholderResults}
            </Results>
          ) : (
            searchResults.length ? (
              <Results>
                {searchResults}
              </Results>
            ) : (
              <NoResults>
                No results found for "{props.searchQuery}".
              </NoResults>
            )
          )
        )}
      </Container>
    </Wrapper>
  )
}

searchResults.propTypes = {
  searchParams: PropTypes.object,
  updateSearch: PropTypes.func,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(searchResults)
