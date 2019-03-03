/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';

function ensureGCryptAPIAddressIsDefinedIntoWindow() {
  const apiAddress = process.env.REACT_APP_GCRYPT_API_ADDRESS;

  if (apiAddress == null) {
    throw new Error('The environment variable REACT_APP_GCRYPT_API_ADDRESS is mandatory');
  }

  try {
    new URL(apiAddress);
  } catch (error) {
    throw new Error(`REACT_APP_GCRYPT_API_ADDRESS environment variable must be a valid URL: ${error}`);
  }

  window.gcrypt = apiAddress;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    ensureGCryptAPIAddressIsDefinedIntoWindow();
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
