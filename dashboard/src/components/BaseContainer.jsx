/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';

const BaseContainer = (props) => (
  <Container>
    <Header />
      {props.children}
    <Footer />
  </Container>
);

export default BaseContainer;
