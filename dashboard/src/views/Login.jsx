/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import BaseContainer from '../components/BaseContainer';
import LoginIntroPanel from '../components/LoginIntroPanel';
import LoginFormPanel from '../components/LoginFormPanel';

const Login = () => (
  <BaseContainer>
    <Row className='mt-3'>
      <Col lg={{ span: 6 }}>
        <LoginIntroPanel />
      </Col>
      <Col lg={{ span: 5, offset: 1 }}>
        <LoginFormPanel />
      </Col>
    </Row>
  </BaseContainer>
);

export default Login;
