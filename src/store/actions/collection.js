import * as actionTypes from './types'

/**
 * Reducer.
 */
export const collectionActions = {
  setCollection: (action) => {
    const { pagination, releases } = action
    return {
      type: actionTypes.COLLECTION_SET_COLLECTION,
      pagination,
      releases
    }
  }
}

/**
 * Sagas.
 */
export const collectionCreators = {
  setCollection: (data) => {
    return {
      type: actionTypes.COLLECTION_INIT_SET_COLLECTION,
      payload: data
    }
  }
}
