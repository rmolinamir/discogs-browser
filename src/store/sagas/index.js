import { takeEvery, all } from 'redux-saga/effects'
import { searchSagas } from './searchSagas.js'
import { collectionSagas } from './collectionSagas.js'
import * as actionTypes from '../actions/types'

export function * watchSearches () {
  yield all([
    takeEvery(actionTypes.SEARCH_INIT_SET_SEARCH, searchSagas.setSearch),
    takeEvery(actionTypes.SEARCH_INIT_UPDATE_SEARCH, searchSagas.updateSearch)
  ])
}

export function * watchCollection () {
  yield all([
    takeEvery(actionTypes.COLLECTION_INIT_SET_COLLECTION, collectionSagas.setCollection)
  ])
}
