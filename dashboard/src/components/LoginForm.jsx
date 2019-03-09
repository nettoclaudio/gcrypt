/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import LoginFormFederated from './LoginFormFederated';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: null };
  }

  async getAuthenticationScheme() {
    try {
      const scheme = await window.gcrypt.client.authenticationScheme();
      return scheme;
    } catch (error) {
      throw error;
    }
  }

  componentDidMount() {
    this.getAuthenticationScheme()
      .then(scheme => {
        if (scheme.name === 'oidc') {
          const { authorizationURL } = scheme.data;
          const form = <LoginFormFederated authorizationURL={authorizationURL} />
          this.setState({ loaded: true, form });
        }
      })
      .catch(error => this.setState({ loaded: false }));
  }

  render() {
    const { form } = this.state;

    return this.state.loaded == null
      ? <p>Loding authentication method...</p>
      : <div>{form}</div>;
  }
}

export default LoginForm;
