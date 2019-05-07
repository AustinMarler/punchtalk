import { createStore, combineReducers } from 'redux'

import chatReducer from './reducers/chatReducer'

const rootReducer = combineReducers({
  chatReducer: chatReducer
})

const store = createStore(rootReducer)

export default store