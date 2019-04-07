import * as types from '../actions/types'

const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  }
}

const initialState = {
  searchQuery: undefined,
  searchParams: {},
  data: {},
}

export const searchesReducer = (state = initialState, action) => {
  const { searchQuery, searchParams, data } = action
  switch(action.type) {
    case types.SEARCH_SET_SEARCH:
      return updateObject(state, {
        searchQuery: searchQuery,
        searchParams: searchParams,
        data: data
      })
    case types.SEARCH_UPDATE_SEARCH:
      return updateObject(state, {
        data: data
      })
    default:
      return state
  }
}
