import * as types from '../actions/types'

const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  }
}

const initialState = {
  searchQuery: undefined,
  data: {},
}

export const searchesReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SEARCH_SET_SEARCH:
      const { searchQuery, data } = action
      return updateObject(state, { searchQuery: searchQuery, data: data })
    default:
      return state
  }
}
