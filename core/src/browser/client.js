/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import axios from 'axios';

import TokenManager from './token-manager';

const defaultOptions = {
  timeout: 5000, // 5 seconds
  tokenManager: new TokenManager(),
};

class Client {
  constructor(target, options = {}) {
    try {
      this.targetURL = new URL(target);
    } catch (error) {
      throw new Error('target is missing or is not a valid URL string');
    }

    this.target = target;
    this.options = Object.assign(options, defaultOptions);
    this.tokenManager = this.options.tokenManager;

    this.baseHttpClient = axios.create({
      baseURL: this.target,
      timeout: this.options.timeout,
    });
  }

  get authorizationHeader() {
    return {
      authorization: `Bearer ${this.tokenManager.token}`,
    };
  }

  isHealthy() {
    const config = {
      responseType: 'text',
      validateStatus: status => status === 200,
    };

    return this.baseHttpClient.get('/health', config)
      .then(() => true)
      .catch(() => Promise.resolve(false));
  }

  authScheme() {
    return this.baseHttpClient.get('/auth/scheme')
      .then(response => response.data);
  }

  authCallback(query) {
    const config = {
      validateStatus: status => status === 200,
    };

    return this.baseHttpClient.get(`/auth/callback?${query}`, config)
      .then(({ data }) => {
        const { token } = data;
        this.tokenManager.token = token;
        return data;
      });
  }

  logout() {
    const config = {
      headers: this.authorizationHeader,
      validateStatus: status => status === 204,
    };

    return this.baseHttpClient.delete('/auth/logout', config)
      .then(() => this.tokenManager.clear());
  }
}

export default Client;
