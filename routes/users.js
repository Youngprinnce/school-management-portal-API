const express = require('express');
const router = express.Router();

const { checkLoggedIn, checkRole } = require('../middlewares/auth');

const {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
  deleteOne,
  getAll,
} = require('../Controllers/userController');

module.exports = () => {
  router.post('/register', register);
  router.put('/login', login);
  router.get('/activate', verify);
  router.put('/forgot-password', forgotPassword);
  router.put('/resetpassword/:token', resetPassword);
  router.delete('/users/:userId', checkLoggedIn, checkRole, deleteOne);
  router.get('/users/', checkLoggedIn, checkRole,  getAll);
  return router;
};
