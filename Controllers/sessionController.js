const Session = require('../models/Session');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const create = async (req, res) => {
   // VALIDATE USER BEFORE SAVE
  const { error, value } = await Session.sessionValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message);
  }

  Session.create(...value, (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      const message = 'Session created successfully';
      sendSuccess(res, data, message);
    }
  });
};

const getAll = (req, res) => {
  Session.find((err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  if (!req.body) {
    const message = 'Updated field cannot be empty';
    return sendError(res, [], message);
  }

  Session.findByIdAndUpdate(req.params.sessionId, req.body, { new: true }, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Session updated  successfully';
      return sendSuccess(res, data, message);
    }
  });
};

const deleteOne = (req, res) => {
  Session.findByIdAndRemove(req.params.sessionId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Session deleted successfully!';
      return sendSuccess(res, [], message);
    }
  });
};

module.exports = {
    getAll,
    create,
    updateOne,
    deleteOne
}