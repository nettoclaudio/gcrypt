/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import axios from 'axios';

const defautlOptions = {
  timeout: 5000, // 5 seconds
};

class Client {
  constructor(target, options={}) {
    try {
      new URL(target);
    } catch (error) {
      throw new Error('target is missing or is not a valid URL string');
    }

    this.target = target;
    this.options = Object.assign(options, defautlOptions);

    this.baseHttpClient = axios.create({
      baseURL: this.target,
      timeout: this.options.timeout,
    });
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
}

export default Client;
