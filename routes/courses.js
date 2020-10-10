const express = require('express');
const router = express.Router();

const { create, getAll, updateOne, deleteOne } = require('../Controllers/courseController');

module.exports = () => {
  router.post('/', create);
  router.get('/', getAll);
  router.put('/:courseId', updateOne);
  router.delete('/:courseId', deleteOne);
  return router;
};
