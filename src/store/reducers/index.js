import ksmReducer from './ksmSlice'
import dotReducer from './dotSlice'

const rootReducer = {
  ksm: ksmReducer,
  dot: dotReducer
}

export default rootReducer
