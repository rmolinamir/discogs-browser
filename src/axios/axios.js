import axios from 'axios'

export const discogsRequestToken = 'rxdPcTSCazkeakCCdoniSEbUClXWfTtlsemLLnmR'

const instance = axios.create({
  baseURL: 'https://api.discogs.com/database/search',
  timeout: 10000,
  params: {
    token: discogsRequestToken,
    'per_page': 16
  }
});

export default instance
