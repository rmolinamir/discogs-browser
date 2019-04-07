import { put } from 'redux-saga/effects'
import { searchActions } from '../actions/searches'

export const searchSagas = {
  setSearch: function* (action) {
    const { searchParams, data } = yield action
    console.log(Object.values(searchParams))
    // Filtering out empty parameters.
    const paramsArray = Object.values(searchParams).filter(param => param !== '')
    const searchQuery = yield paramsArray.join(`${paramsArray.length >= 2 ? ' - ' : ''}`)
    yield put(searchActions.setSearch({ searchQuery, searchParams, data }))
  },
  updateSearch: function* (action) {
    const { data } = yield action
    yield put(searchActions.updateSearch({ data }))
  }
}
