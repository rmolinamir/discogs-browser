import * as actionTypes from './types'

/**
 * Reducer.
 */
export const searchActions = {
  setSearch: (action) => {
    const { searchQuery, searchParams, data } = action
    return {
        type: actionTypes.SEARCH_SET_SEARCH,
        searchParams,
        searchQuery,
        data
    }
  },
  updateSearch: (action) => {
    const { data } = action
    return {
        type: actionTypes.SEARCH_UPDATE_SEARCH,
        data
    }
  }
}

/**
 * Sagas.
 */
export const searchCreators = {
  setSearch: (searchParams, data) => {
    return {
      type: actionTypes.SEARCH_INIT_SET_SEARCH,
      searchParams: searchParams,
      data: data
    }
  },
  updateSearch: (data) => {
    return {
      type: actionTypes.SEARCH_INIT_UPDATE_SEARCH,
      data: data
    }
  }
}