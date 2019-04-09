import React from 'react'
import PropTypes from 'prop-types'
import fetch from './fetch/axios'
import collection, { allId } from './collection/axios'
import { connect } from 'react-redux'
import {
  searchCreators,
  collectionCreators
} from './store/actions'
// CSS
import 'react-toastify/dist/ReactToastify.min.css'
// JSX
import { ToastContainer } from 'react-toastify'
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
/**
 * `ScrollToTop` listens to changes in the address/route. If so, scrolls to top.
 */
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop'
import Collection from './containers/Collection/Collection'
import Landing from './containers/Landing/Landing'

/**
 * **SELF NOTE**
 * After testing I found out that the blur-in effect from the react lazy image library package should be
 * turned off in mobile, it generates artifacts. Leaving this here for the future!
 */

/**
 * Hardcoded, but can be fetched from google trends or from a database.
 */
const topArtists2019 = [
  'Ariana Grande',
  'Post Malone',
  'Queen',
  'Motley Crue',
  'Imagine Dragons',
  'Drake',
  'Bruno Mars',
  'Ed Sheeran',
  'Maroon 5',
  'Eminem',
  'Chris Stapleton',
  'The Beatles',
  'Metallica',
  'Daddy Yankee'
]

const app = (props) => {
  /**
   * Initial results based on the latests top trending artists on the bill board.
   */
  const fetchResults = async () => {
    try {
      const randomArtist = topArtists2019[Math.floor(Math.random() * topArtists2019.length)]
      const params = {
        artist: randomArtist
      }
      const response = await fetch.get('', {
        params: {
          ...params
        }
      })
      props.setSearch && props.setSearch(params, response.data)
    } catch (error) {
      await console.error(error)
    }
  }

  const fetchCollection = async () => {
    try {
      const response = await collection.get(`/${allId}/releases`)
      props.setCollection && await props.setCollection(response.data)
    } catch (error) {
      await console.error(error)
    }
  }

  /**
   * This `useEffect` is the equivalent to `componendDidMount`.
   * Here the results and the collection are set up initially for the redux store.
   * Note that `fetchCollection` won't execute if the user is **initially** on the
   * collection route, since the collection is updated every time the user visits
   * that route.
   */
  React.useEffect(() => {
    // Delay at least half a second for smooth transitions on mount.
    const currentLocation = props.location.pathname
    // eslint-disable-next-line no-new
    new Promise(() => {
      setTimeout(() => {
        fetchResults()
        if (currentLocation !== '/collection') {
          fetchCollection()
        }
      }, 500)
    })
  }, [])

  return (
    <Layout>
      <ToastContainer
        position='top-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnVisibilityChange
        draggable
        pauseOnHover />
      <ScrollToTop />
      <Switch>
        <Route path='/collection' component={Collection} />
        <Route path='/' exact component={Landing} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data)),
    setCollection: (data) => dispatch(collectionCreators.setCollection(data))
  }
}

app.propTypes = {
  setSearch: PropTypes.func,
  setCollection: PropTypes.func,
  location: PropTypes.object
}

export default withRouter(connect(null, mapDispatchToProps)(app))
