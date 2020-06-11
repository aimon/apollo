import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Transcript from './containers/transcript'
import './assets/styles/app.scss'

export default () => (
  <Provider store={store()}>
    <Transcript />
  </Provider>
)
