import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles/base.css'
import { AuthProvider, AuthRoute } from '../lib/Auth'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from './auth/Welcome';
import UserLogin from './auth/UserLogin';
import RegisterUser from './auth/RegisterUser';
import Channel from './chat/Channel';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Provider store={store}>
          <Router>
            <div>
              {/* private routes */}
              <AuthRoute exact path='/channel' component={Channel} />

              {/* public routes */}
              <Route exact path='/' component={Welcome} />
              <Route exact path='/user-login' component={UserLogin} />
              <Route exact path='/register-user' component={RegisterUser} />
            </div>
          </Router>
        </Provider>
      </AuthProvider>
    )
  }
}

export default App
