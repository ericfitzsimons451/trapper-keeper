import { combineReducers } from 'redux';
import { noteReducer } from './noteReducer'
import { errorReducer } from './errorReducer'
import { loadingReducer} from './loadingReducer'
import { startID } from "./startIDReducer"

export const rootReducer = combineReducers({
  notes: noteReducer,
  errorMsg: errorReducer,
  isLoading: loadingReducer,
  startID: startID
})