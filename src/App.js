import React from 'react'
import axios from './fetch/axios'
import { connect } from 'react-redux'
import { searchCreators } from './store/actions'
// JSX
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
  const fetchResults = async () => {
    try {
      const randomArtist = topArtists2019[Math.floor(Math.random() * topArtists2019.length)];
      const params = {
        artist: randomArtist,
      }
      const response = await axios.get('', {
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
    <Landing />
  )
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSearch: (params, data) => dispatch(searchCreators.setSearch(params, data))
	}
}

export default connect(null, mapDispatchToProps)(app)
