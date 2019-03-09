/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Footer = () => (
  <Row as='footer' className='mt-5'>
    <Col md={{ span: 6, offset: 3 }}>
      <p className='text-center'>
        <small>
          {`made with <3 by `}<a href='https://csirt.globo' rel='noopener noreferrer' target='_blank' title='CSIRT.globo'>CSIRT.globo</a>
        </small>
        <br />
        <small>
          <a href='https://github.com/globocom/gcrypt' rel='noopener noreferrer' target='_blank' title='Fork me on GitHub'>GitHub</a>
        </small>
      </p>
    </Col>
  </Row>
);

export default Footer;
