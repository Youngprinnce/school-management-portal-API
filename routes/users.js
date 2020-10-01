const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  activateUser,
  userForgotPassword,
  resetUserPassword,
} = require('../Controllers/userController');

module.exports = () => {
  router.post('/register', registerUser);
  router.put('/login', loginUser);
  router.get('/activate', activateUser);
  router.put('/forgot-password', userForgotPassword);
  router.put('/resetpassword/:token', resetUserPassword);
  return router;
};
