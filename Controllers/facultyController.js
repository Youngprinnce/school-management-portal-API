const Faculty = require('../models/Faculty');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const create = (req, res) => {
  const {name} = req.body
  if (!name) {
    const message = 'Faculty name is required';
    return sendError(res, [], message);
  }

  Faculty.create({name} , (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      const message = 'Faculty created successfully';
      sendSuccess(res, data, message);
    }
  });
};

const getAll = (req, res) => {
  Faculty.find((err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  if (!req.body.name) {
    const message = 'Faculty name cannot be empty';
    return sendError(res, [], message);
  }

  Faculty.findByIdAndUpdate(req.params.facultyId, req.body, { new: true }, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Faculty updated  successfully';
      return sendSuccess(res, data, message);
    }
  });
};

const deleteOne = (req, res) => {
  Faculty.findByIdAndRemove(req.params.facultyId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Faculty deleted successfully!';
      return sendSuccess(res, [], message);
    }
  });
};

module.exports = {
  create,
  getAll,
  updateOne,
  deleteOne,
};
