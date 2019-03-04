import { BrowserClient } from '@globocom/gcrypt-core';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

jest.mock('@globocom/gcrypt-core', () => ({ BrowserClient: jest.fn() }));

describe('<App />', () => {
  beforeEach(() => {
    BrowserClient.mockClear();
    delete window.gcrypt;
    process.env.REACT_APP_GCRYPT_API_ADDRESS = 'https://api.gcrypt.example.com';
  });

  it('when REACT_APP_GCRYPT_API_ADDRESS is not a valid URL, should thrown an expected error', () => {
    process.env.REACT_APP_GCRYPT_API_ADDRESS = 'invalid URL';
    const div = document.createElement('div');
    expect(() => ReactDOM.render(<App />, div))
      .toThrowError(/^REACT_APP_GCRYPT_API_ADDRESS environment variable is missing or not a valid URL: .+/);
  });

  it('when REACT_APP_GCRYPT_API_ADDRESS is an valid URL, should create a new GCrypt client and put it into window context', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(BrowserClient).toHaveBeenCalledWith(process.env.REACT_APP_GCRYPT_API_ADDRESS);
    expect(window).toHaveProperty('gcrypt.client', new BrowserClient());
  });
});
