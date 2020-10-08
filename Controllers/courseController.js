const Course = require('../models/Course');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const create = (req, res) => {
  const name = req.body.name;
  if (!name) {
    const message = 'Course name cannot be empty';
    return sendError(res, [], message);
  }

  Course.create({ name }, (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      const message = 'Course created successfully';
      sendSuccess(res, data, message);
    }
  });
};

const getAll = (req, res) => {
  Course.find((err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  if (!req.body.name) {
    const message = 'Course name cannot be empty';
    return sendError(res, [], message);
  }

  Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true }, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Course updated successfully';
      return sendSuccess(res, data, message);
    }
  });
};

const deleteOne = (req, res) => {
  Course.findByIdAndRemove(req.params.courseId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Course deleted successfully!';
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
