const User = require('../models/User');
const Department = require('../models/Department');
const uniqueToken = require('../utils/tokenGenerator');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const create = async (req, res) =>{
  //CHECK FOR EMPTY STAFF DETAILS
  const {staff_department} = req.body
  if (!req.body) {
    const message = "Staff details cannot be empty"
    sendError(res,[], message)
  }

  //CREATE NEW STAFF ID
  const staff_id = "stf" + uniqueToken();

  //ATTACH DEPARTMENT TO STAFF
  const department = await Department.findOne({name:staff_department})

  //SAVE NEW STAFF TO DB
  const staff = new User({...req.body, staff_id, staff_department: department });
  const newStaff = await staff.save();
  if (!newStaff) {
    const message = 'Error! Try again';
    return sendError(res, [], message);
  }

  const message = "Staff successfully registered"
  sendSuccess(res,[], message)
}

const getAll = (req, res) => {
  User.find({role:"staff"}).populate("staff_department", "name -_id").exec((err, data) => {
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
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};
