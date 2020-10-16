const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');


const getAll = (req, res) => {
  User.find({role:"staff"},(err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const getOne = (req, res) => {
  User.findOne({_id:req.params.staffId}, (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  User.findByIdAndUpdate(
    req.params.staffId,
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        return sendError(res, err);
      } else {
        const message = 'Staff updated successfully';
        return sendSuccess(res, data, message);
      }
    }
  );
};

const deleteOne = (req, res) => {
  User.findByIdAndRemove(req.params.staffId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'Staff deleted successfully!';
      return sendSuccess(res, [], message);
    }
  });
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  deleteOne,
};
