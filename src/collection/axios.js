import axios from 'axios'
import { discogsRequestToken, username } from '../shared/discogsParams'

const instance = axios.create({
  baseURL: `https://api.discogs.com/database/users/${username}/collection/folders`,
  timeout: 10000,
  params: {
    token: discogsRequestToken
  }
});

export default instance
