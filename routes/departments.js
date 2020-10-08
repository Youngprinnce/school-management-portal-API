const express = require('express');
const router = express.Router();

const { create, getAll, updateOne, deleteOne } = require('../Controllers/departmentController');

module.exports = () => {
  router.post('/', create);
  router.get('/', getAll);
  router.put('/:departmentId', updateOne);
  router.delete('/:departmentId', deleteOne);
  return router;
};
