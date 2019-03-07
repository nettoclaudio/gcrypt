/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

class TokenManager {
  constructor(key='gcrypt_token', storage=localStorage) {
    this.key = key;
    this.storage = storage;
  }

  get token() {
    this.storage.getItem(this.key);
  }

  set token(token) {
    this.storage.setItem(this.key, token);
  }
}

export default TokenManager;
