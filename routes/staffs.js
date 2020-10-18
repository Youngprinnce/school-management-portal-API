const express = require('express');
const router = express.Router();

const {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require('../Controllers/staffController');

module.exports = () => {
  router.post("/", create)
  router.get("/:staffId",getOne)
  router.get('/', getAll);
  router.put('/:staffId',updateOne);
  router.delete('/:staffId',deleteOne);
  return router;
};
