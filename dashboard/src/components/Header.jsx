/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import Brand from './Brand';

const Header = () => (
  <Row as='header'>
    <Navbar expand='lg'>
      <Navbar.Brand>
        <Brand />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbar-nav' />
      <Navbar.Collapse id='navbar-nav'>
        <Nav navbar className='text-right'>
          <Nav.Link href='#'>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Row>
);

export default Header;
