import { takeEvery, all } from 'redux-saga/effects'
import { searchSagas } from './searchSagas.js'
import * as actionTypes from '../actions/types'

export function* watchSearches () {
  yield all([
    takeEvery(actionTypes.SEARCH_INIT_SET_SEARCH, searchSagas.setSearch),
    takeEvery(actionTypes.SEARCH_INIT_UPDATE_SEARCH, searchSagas.updateSearch)
  ])
}
