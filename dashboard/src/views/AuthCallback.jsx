/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

class AuthCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  componentDidMount() {
    const { search } = window.location;
    window.gcrypt.client.authorizationCallback(search)
      .then(() => this.setState({ authenticated: true }))
      .catch(() => this.setState({ authenticated: false }));
  }

  render() {
    return this.state.authenticated == null
      ? <p>Authenticating on GCrypt API</p>
      : this.state.authenticated === true
        ? <Redirect to='/' />
        : <Redirect to='/login' />;
  }
}

export default AuthCallback;
