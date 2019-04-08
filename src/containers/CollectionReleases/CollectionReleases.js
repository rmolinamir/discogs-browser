import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import collection, { allId } from '../../collection/axios'
import { collectionCreators } from '../../store/actions'
import loadingSVG from '../../assets/images/loading.svg'
// JSX
import { 
  Wrapper,
  Loading,
  Title,
  PrevButton,
  NextButton,
  Container,
  Releases,
  NoReleases
} from './styled-components'
import Release from '../../components/UI/Release/Release'
import ReactPaginate from 'react-paginate'
import { Icon } from 'react-svg-library'

/**
 * Axios cancel token to cancel pending searches if user changes pages too fast.
 */
const CancelToken = axios.CancelToken
let cancel

const app = (props) => {
  /**
   * To scroll up after every change of page.
   */
  const myContainer = React.useRef(null)

  const [paginationData, setPaginationData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [areReleasesLoading, setReleasesLoading] = React.useState(true)

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
      await setReleasesLoading(true)
      await scrollToTop()
      const response = await collection.get(`/${allId}/releases`, {
        params: {
          ...props.searchParams,
          page: selectedPage
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
      await props.setCollection && props.setCollection(response.data)
      await setReleasesLoading(false)
    }
  }

  const setReleases = (releases) => {
    return releases.map(release => {
      return (
        <Release
          key={release.instance_id}
          {...release.basic_information} />
      )
    })
  }

  const searchReleases = props.releases && props.releases.length && setReleases(props.releases)

  const placeholderReleases = React.useMemo(() => {
    const emptyArray = Array.from(new Array(16))
    return emptyArray.map((_, index) => {
      return (
        <Release
          key={index}
          placeholder={loadingSVG}
          cover_image={loadingSVG}
          thumb={loadingSVG} />
      )
    })
  }, [])

  const paginationDataHandler = (pagination) => {
    setPaginationData({ ...pagination })
    setIsLoading(false)
    setReleasesLoading(false)
  }

  /**
   * Every time the data changes means there was a change in the page.
   * If so, then the pagination component will be updated appropriately.
   */
  React.useEffect(() => {
    if (Boolean(props.pagination)) {
      const { pagination } = props
      paginationDataHandler(pagination)
    }
  }, [props])

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
      {paginationData ? (
        <>
          {/* Depending on the route, the title will be different. */}
          <Title>Your collection</Title>  
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
          <Releases>
            {placeholderReleases}
          </Releases>
        ) : (
          /**
           * Only show the placeholder elements if the results are being fetched either by the form, or by
           * changing pages.
           */
          areReleasesLoading || props.isLoading ?
          (
            <Releases>
              {placeholderReleases}
            </Releases>
          ) : (
            searchReleases.length ? (
              <Releases>
                {searchReleases}
              </Releases>
            ) : (
              <NoReleases>
                No results found for "{props.searchQuery}".
              </NoReleases>
            )
          )
        )}
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
	return {
    pagination: state.collectionReducer && state.collectionReducer.pagination,
    releases: state.collectionReducer && state.collectionReducer.releases
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCollection: (data) => dispatch(collectionCreators.setCollection(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(app)