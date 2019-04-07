import { put } from 'redux-saga/effects'
import { searchActions } from '../actions/searches'

export const searchSagas = {
  setSearch: function* (action) {
    const { searchParams, data } = yield action
    const searchQuery = yield Object.values(searchParams).join(' ')
    yield put(searchActions.setSearch({ searchQuery, searchParams, data }))
  },
  updateSearch: function* (action) {
    const { data } = yield action
    yield put(searchActions.updateSearch({ data }))
  }
}
