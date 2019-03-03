import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    process.env.REACT_APP_GCRYPT_API_ADDRESS = 'https://api.gcrypt.example.com';
  });

  it('when REACT_APP_GCRYPT_API_ADDRESS is not defined, should thrown an expected error', () => {
    delete process.env.REACT_APP_GCRYPT_API_ADDRESS;
    const div = document.createElement('div');
    expect(() => ReactDOM.render(<App />, div))
      .toThrowError('The environment variable REACT_APP_GCRYPT_API_ADDRESS is mandatory');
  });

  it('when REACT_APP_GCRYPT_API_ADDRESS is not a valid URL, should thrown an expected error', () => {
    process.env.REACT_APP_GCRYPT_API_ADDRESS = 'invalid URL';
    const div = document.createElement('div');
    expect(() => ReactDOM.render(<App />, div))
      .toThrowError(/^REACT_APP_GCRYPT_API_ADDRESS environment variable must be a valid URL:.*/);
  });

  it('when REACT_APP_GCRYPT_API_ADDRESS is a valid URL, should set that into window', () => {
    expect(window.gcrypt).toBeFalsy();
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(window.gcrypt).toEqual(process.env.REACT_APP_GCRYPT_API_ADDRESS);
  });
});
