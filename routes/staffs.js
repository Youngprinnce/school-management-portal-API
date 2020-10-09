const express = require('express');
const router = express.Router();

const {checkRole, checkLoggedIn, dualRole } = require('../middlewares/auth');

const {
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require('../Controllers/staffController');

module.exports = () => {
  router.get("/:staffId", checkLoggedIn, dualRole,  getOne)
  router.get('/', checkLoggedIn, checkRole, getAll);
  router.put('/:staffId', checkLoggedIn, dualRole, updateOne);
  router.delete('/:staffId', checkLoggedIn, checkRole, deleteOne);
  return router;
};
