import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const rejectedRequestLogger = () => next => action => {
  if (process.env.NODE_ENV === 'development') {
    // console.info(action.type)
  }
  next(action)
}

export default data => {
  const middleware = [thunk, rejectedRequestLogger]
  return createStore(reducers, data, compose(
    applyMiddleware(...middleware)
  ))
}
