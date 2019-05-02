import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'

import Form from './Form'
import Messages from './Messages'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Form />
        <Messages />
      </Provider>
    )
  }
}

export default App
