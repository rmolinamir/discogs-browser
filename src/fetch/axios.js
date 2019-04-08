import axios from 'axios'
import { discogsRequestToken, resultsPerPage } from '../shared/discogsParams'


const instance = axios.create({
  baseURL: 'https://api.discogs.com/database/search',
  timeout: 10000,
  params: {
    token: discogsRequestToken,
    per_page: resultsPerPage
  }
})

export default instance
