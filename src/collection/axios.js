import axios from 'axios'
import { discogsRequestToken, username } from '../shared/discogsParams'

export const folderId = 1 // 'Uncategorized folder'

const instance = axios.create({
  baseURL: `https://api.discogs.com/users/${username}/collection/folders/1`,
  timeout: 10000,
  params: {
    token: discogsRequestToken
  }
});

export default instance
