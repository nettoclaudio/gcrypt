/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { BrowserClient as GCrypt } from '@globocom/gcrypt-core';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import AuthCallback from './AuthCallback';

function createGCryptClientAtGlobalContext() {
  const apiAddress = process.env.REACT_APP_GCRYPT_API_ADDRESS;

  try {
    new URL(apiAddress);
  } catch (error) {
    throw new Error(`REACT_APP_GCRYPT_API_ADDRESS environment variable is missing or not a valid URL: ${error}`);
  }

  window.gcrypt = window.gcrypt || {};
  window.gcrypt.client = new GCrypt(apiAddress);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    createGCryptClientAtGlobalContext();
  }

  isAuthenticated() {
    return window.gcrypt.client.sessionStorage.retrieve() == null
      ? false : true;
  }

  render() {
    return (
      <Router>
        <>
          <Route path="/" exact render={() => {
            return this.isAuthenticated()
              ? <Home />
              : <Redirect to='/login' />
          }} />

          <Route path="/login" render={() => {
            return this.isAuthenticated()
              ? <Redirect to='/' />
              : <Login />
          }} />

          <Route path="/auth/callback" render={() => {
            return this.isAuthenticated()
              ? <Redirect to='/' />
              : <AuthCallback />
          }} />
        </>
      </Router>
    );
  }
}

export default App;
