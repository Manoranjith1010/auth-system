const test = require('node:test');
const assert = require('node:assert/strict');

process.env.JWT_SECRET = 'test-secret';
process.env.JWT_ACCESS_EXPIRES_IN = '15m';

const { generateAccessToken, verifyAccessToken } = require('../src/services/jwt.service');

test('creates and verifies an access token', () => {
  const payload = { id: 'user-1', role: 'student' };
  const token = generateAccessToken(payload);

  assert.match(token, /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/);

  const decoded = verifyAccessToken(token);
  assert.equal(decoded.id, payload.id);
  assert.equal(decoded.role, payload.role);
});
