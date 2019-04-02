import { combineReducers } from 'redux';
import { noteReducer } from './noteReducer'

export const rootReducer = combineReducers({
  notes: noteReducer
})