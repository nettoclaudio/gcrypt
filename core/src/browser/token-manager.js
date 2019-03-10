/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

class TokenManager {
  constructor(key = 'gcrypt_token', storage = window.localStorage) {
    this.key = key;
    this.storage = storage;
  }

  get token() {
    return this.storage.getItem(this.key);
  }

  set token(token) {
    this.storage.setItem(this.key, token);
  }

  clear() {
    this.storage.removeItem(this.key);
  }
}

export default TokenManager;
