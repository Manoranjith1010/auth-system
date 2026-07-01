const bcrypt = require('bcrypt');
const User = require('../models/User');

const hashPassword = async (password) => bcrypt.hash(password, 10);

const comparePasswords = async (candidatePassword, hashedPassword) =>
  bcrypt.compare(candidatePassword, hashedPassword);

const findUserByEmail = async (email) => User.findOne({ email });

module.exports = { hashPassword, comparePasswords, findUserByEmail };
