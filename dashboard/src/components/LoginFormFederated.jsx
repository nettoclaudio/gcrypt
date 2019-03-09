/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Button from 'react-bootstrap/Button';

const LoginFormFederated = (props) => {
  const getCallbackURL = () => {
    return `${window.location.origin}/auth/callback`;
  }

  const handleButtonClick = (event) => {
    const newURL = new URL(props.authorizationURL);
    newURL.searchParams.set('redirect_uri', getCallbackURL());
    window.location.href = newURL.toString();
  };

  return (
    <div className='mt-4'>
      <Button size='lg' variant='dark' block onClick={handleButtonClick}>Authenticate with OpenID Connect</Button>
    </div>
  );
}

export default LoginFormFederated;
