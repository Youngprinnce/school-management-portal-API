const express = require('express');
const router = express.Router();

const { checkLoggedIn, checkRole,} = require('../middlewares/auth');

const { create, getAll, updateOne, deleteOne } = require('../Controllers/sessionController');

module.exports = () => {
  router.get('/', checkLoggedIn, checkRole, getAll);
  router.post('/', checkLoggedIn, checkRole, create);
  router.put('/:sessionId', checkLoggedIn, checkRole, updateOne);
  router.delete('/:sessionId', checkLoggedIn, checkRole, deleteOne);
  return router;
};
