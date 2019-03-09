/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import axios from 'axios';

class Client {
  constructor(target) {
    try {
      new URL(target);
    } catch (error) {
      throw new Error('target is missing or is not a valid URL string');
    }

    this.target = target;

    this.baseHttpClient = axios.create({
      baseURL: this.target,
      timeout: 5000,
    });
  }

  isHealthy() {
    return this.baseHttpClient.get('/health')
      .then(response => response.status === 200 ? true : false)
      .catch(() => Promise.resolve(false));
  }
}

export default Client;
