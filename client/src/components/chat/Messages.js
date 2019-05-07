import React, { Component } from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map((message, i) => (
          <li key={"message" + i}>{message}</li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps(appState) {
  console.log(appState)
  return {
    messages: appState.chatReducer.messages
  }
}

export default connect(mapStateToProps)(Messages)