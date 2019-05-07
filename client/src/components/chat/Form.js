import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions/chat'

class Form extends Component {
  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  sendMessage = (e) => {
    e.preventDefault()
    sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendMessage}>
          <input type="text" name="message" id="message" placeholder="message" value={this.state.message} onChange={this.handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(appState) {
  return {

  }
}

export default connect(mapStateToProps)(Form)