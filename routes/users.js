const express = require('express');
const router = express.Router();

const {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
} = require('../Controllers/userController');

module.exports = () => {
  router.post('/register', register);
  router.put('/login', login);
  router.get('/activate', verify);
  router.put('/forgot-password', forgotPassword);
  router.put('/resetpassword/:token', resetPassword);
  return router;
};
