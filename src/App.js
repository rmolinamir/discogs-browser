import React from 'react'
import fetch from './fetch/axios'
import { connect } from 'react-redux'
import { searchCreators } from './store/actions'
// JSX
import { Route, Switch, Redirect } from 'react-router-dom'
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop'
import Collection from './containers/Collection/Collection'
import Landing from './containers/Landing/Landing'

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
      const randomArtist = topArtists2019[Math.floor(Math.random() * topArtists2019.length)];
      const params = {
        artist: randomArtist,
      }
      const response = await fetch.get('', {
        params: {
          ...params
        }
      })
      props.setSearch && props.setSearch(params, response.data)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * This `useEffect` is the equivalent to `componendDidMount`.
   */
  React.useEffect(() => {
    // Delay at least 1 second for smooth transitions on mount.
    new Promise(() => {
      setTimeout(() => {
        fetchResults()
      }, 1000)
    })
  }, [])

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path='/collection' component={Collection} />
        <Route path='/' exact component={Landing} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data))
	}
}

export default connect(null, mapDispatchToProps)(app)
