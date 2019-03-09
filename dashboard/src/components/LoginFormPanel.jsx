/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginForm from './LoginForm';

const LoginFormPanel = () => (
  <div>
    <Row>
      <Col as='h3'>LOGIN</Col>
    </Row>
    <Row>
      <Col>
        <LoginForm />
      </Col>
    </Row>
  </div>
);

export default LoginFormPanel;
