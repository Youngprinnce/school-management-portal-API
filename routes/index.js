const express = require('express');
const router = express.Router();

// APPLICATION ROUTE
const loginRoute = require('./login.js');
const regRoute = require('./registration');
const confirmRoute = require('./confirmation');

module.exports = () => {
  router.use('/register', regRoute());
  router.use('/login', loginRoute());
  router.use('/confirmation', confirmRoute());
  return router;
};
