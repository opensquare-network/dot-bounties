import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { getDefaultMiddleware } from '@reduxjs/toolkit'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware
})
export default store
