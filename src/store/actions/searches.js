import * as actionTypes from './types'

/**
 * Reducer.
 */
export const searchActions = {
  setSearch: (action) => {
    console.group('action', action)
    const { searchQuery, data } = action
    return {
        type: actionTypes.SEARCH_SET_SEARCH,
        searchQuery,
        data
    }
  }
}

/**
 * Sagas.
 */
export const searchCreators = {
  onMount: (searchParams, data) => {
    return {
      type: actionTypes.SEARCH_ON_MOUNT,
      searchParams: searchParams,
      data: data
    }
  },
  userSearch: (searchParams, data) => {
    return {
      type: actionTypes.SEARCH_USER,
      searchParams: searchParams,
      data: data
    }
  }
}