const jwt = require('jsonwebtoken');
const { jwtSecret, jwtAccessExpiresIn, jwtRefreshExpiresIn } = require('../config/env');

const generateAccessToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: jwtAccessExpiresIn });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshExpiresIn });

const verifyAccessToken = (token) => jwt.verify(token, jwtSecret);

const verifyRefreshToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
