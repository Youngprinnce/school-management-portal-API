const express = require('express');
const router = express.Router();

const { create, getAll, updateOne, deleteOne } = require('../Controllers/sessionController');

module.exports = () => {
  router.get('/', getAll);
  router.post('/', create);
  router.put('/:sessionId', updateOne);
  router.delete('/:sessionId', deleteOne);
  return router;
};
