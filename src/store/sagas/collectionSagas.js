import { put } from 'redux-saga/effects'
import { collectionActions } from '../actions/collection'

export const collectionSagas = {
  setCollection: function* (action) {
    const { payload } = yield action
    yield put(collectionActions.setCollection({ ...payload })) // Deconstructs the data and pagination objects.
  }
}
