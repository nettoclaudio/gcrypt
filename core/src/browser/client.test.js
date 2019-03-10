import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import Client from './client';
import TokenManager from './token-manager';

describe('Client', () => {
  const target = 'https://api.gcrypt.example.com';
  const baseNock = nock(target);

  const token = 'awesome-session-token';
  const authenticatedNock = nock(target, {
    reqheaders: {
      authorization: `Bearer ${token}`,
    },
  });

  let client = null;

  beforeEach(() => {
    const tokenManager = new TokenManager();
    tokenManager.token = token;

    client = new Client(target, { tokenManager });
    client.baseHttpClient.defaults.adapter = httpAdapter;
  });

  describe('constructor', () => {
    it('when target is invalid, should throw an expected error message', () => {
      const targets = [null, 'invalid URL', {}, () => {}];
      targets.forEach((t) => {
        expect(() => new Client(t))
          .toThrowError('target is missing or is not a valid URL string');
      });
    });
  });

  describe('#isHealthy()', () => {
    const healthNock = baseNock.get('/health');

    it('when API is working, should resolve to true', () => {
      healthNock.reply(200, 'WORKING');
      return expect(client.isHealthy()).resolves.toEqual(true);
    });

    it('when API returns a non-200 status, should resolve to false', () => {
      healthNock
        .reply(500, 'DOWN')
        .get('/health')
        .reply(204);
      const promises = [client.isHealthy(), client.isHealthy()];
      return expect(Promise.all(promises))
        .resolves.toEqual([false, false]);
    });
  });

  describe('#authScheme()', () => {
    it('should resolve with the expected object', () => {
      const expected = { name: 'oidc', data: { authorizationURL: 'https://oidc.example.com/...' } };

      baseNock
        .get('/auth/scheme')
        .reply(200, expected);

      return expect(client.authScheme())
        .resolves.toEqual(expected);
    });
  });

  describe('#authCallback()', () => {
    it('when authentication is succeded, should store the token and return it', async () => {
      client.tokenManager.clear();

      const zeroUUID = '00000000-0000-0000-0000-000000000000';
      const queryString = `session_code=${zeroUUID}&code=${zeroUUID}`;

      const expected = { token: 'awesome-session-token' };

      baseNock.get(`/auth/callback?${queryString}`)
        .reply(200, expected);

      const data = await client.authCallback(queryString);
      expect(data).toEqual(expected);
      expect(client.tokenManager).toHaveProperty('token', expected.token);
    });
  });

  describe('#logout()', () => {
    it('when logout is succeded, should remove the token into session storage', async () => {
      authenticatedNock
        .delete('/auth/logout')
        .reply(204);

      await client.logout();
      expect(client.tokenManager).toHaveProperty('token', null);
    });
  });
});
