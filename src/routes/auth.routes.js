const express = require('express');
const {
  register,
  login,
  logout,
  profile,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
} = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { registerValidation, loginValidation, handleValidationErrors } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/logout', protect, logout);
router.get('/profile', protect, authorize('user', 'student', 'instructor', 'admin'), profile);
router.post('/refresh', refresh);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/change-password', protect, changePassword);
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
