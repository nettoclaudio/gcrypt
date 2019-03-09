import nock from 'nock';

import Client from './client';

describe('Client', () => {
  const target = 'https://api.gcrypt.example.com';
  const baseNock = nock(target)
    .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

  let client = null;

  beforeEach(() => {
    client = new Client(target);
  });

  describe('constructor', () => {
    it('when target is invalid, should throw an expected error message', () => {
      const targets = [ null, 'invalid URL', {}, () => {} ];
      targets.forEach(target => {
        expect(() => new Client(target))
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
});
