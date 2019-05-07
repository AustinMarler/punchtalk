import React, { Component } from 'react'

import Form from './Form'
import Messages from './Messages'

class Channel extends Component {
  render() {
    return (
      <div>
        <Form />
        <Messages />
      </div>
    )
  }
}

export default Channel