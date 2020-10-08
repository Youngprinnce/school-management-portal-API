const express = require('express');
const router = express.Router();

const { create, getAll, updateOne, deleteOne } = require('../Controllers/facultyController');

module.exports = () => {
  router.post('/', create);
  router.get('/', getAll);
  router.put('/:facultyId', updateOne);
  router.delete('/:facultyId', deleteOne);
  return router;
};
