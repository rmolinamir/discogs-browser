import axios from 'axios'

export const discogsRequestToken = 'rxdPcTSCazkeakCCdoniSEbUClXWfTtlsemLLnmR'

export const resultsPerPage = 20

const instance = axios.create({
  baseURL: 'https://api.discogs.com/database/search',
  timeout: 10000,
  params: {
    token: discogsRequestToken,
    'per_page': resultsPerPage
  }
});

export default instance
