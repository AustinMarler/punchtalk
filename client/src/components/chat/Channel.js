import React, { useContext } from 'react'

import Form from './Form'
import Messages from './Messages'
import { AuthContext } from '../../lib/Auth'

function Channel (props) {
  const { signout } = useContext(AuthContext)

  function logout () {
    signout()
      .then(props.history.push('/'))
  }

  return (
    <div>
      <Form />
      <Messages />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Channel