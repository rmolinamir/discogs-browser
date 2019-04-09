import { combineReducers } from 'redux'
import { searchesReducer } from './searches'
import { collectionReducer } from './collection'

const rootReducer = combineReducers({
  searchesReducer,
  collectionReducer
})

export default rootReducer
