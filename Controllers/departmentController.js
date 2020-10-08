const Department = require('../models/Department');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const create = (req, res) => {
  const name = req.body.name;
  if (!name) {
    const message = 'Department name cannot be empty';
    return sendError(res, [], message);
  }

  Department.create({ name }, (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      const message = 'Department created successfully';
      sendSuccess(res, data, message);
    }
  });
};

const getAll = (req, res) => {
  Department.find((err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  if (!req.body.name) {
    const message = 'Department name cannot be empty';
    return sendError(res, [], message);
  }

  Department.findByIdAndUpdate(req.params.departmentId, req.body, { new: true }, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Department updated successfully';
      return sendSuccess(res, data, message);
    }
  });
};

const deleteOne = (req, res) => {
  Department.findByIdAndRemove(req.params.departmentId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Department deleted successfully!';
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
