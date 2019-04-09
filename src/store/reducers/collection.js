import * as types from '../actions/types'

const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  }
}

const initialState = {
  pagination: {},
  releases: []
}

export const collectionReducer = (state = initialState, action) => {
  const { pagination, releases } = action
  switch (action.type) {
    case types.COLLECTION_SET_COLLECTION:
      return updateObject(state, {
        pagination: pagination,
        releases: releases
      })
    default:
      return state
  }
}
