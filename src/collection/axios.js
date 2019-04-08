import axios from 'axios'
import { discogsRequestToken, username, resultsPerPage } from '../shared/discogsParams'

export const allId = 1 // 'All folder'
export const uncategorizedId = 1 // 'Uncategorized folder'

const instance = axios.create({
  baseURL: `https://api.discogs.com/users/${username}/collection/folders`,
  timeout: 10000,
  params: {
    token: discogsRequestToken,
    'per_page': resultsPerPage
  }
})

export default instance
