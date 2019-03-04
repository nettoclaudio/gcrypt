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
} from 'react-router-dom';

import Home from './Home';

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

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home} exact />
        </div>
      </Router>
    );
  }
}

export default App;
