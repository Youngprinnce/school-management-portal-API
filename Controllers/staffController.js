const Staff = require('../models/Staff');
const User = require("../models/User")
const Department = require('../models/Department');
const uniqueToken = require('../utils/tokenGenerator');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const sendMail = require('../utils/emailService');

const create = async (req, res) => {
  // VALIDATE USER BEFORE SAVE
  const { error, value } = await User.regValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message);
  }

  const { staff_department, email, password } = value

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    const message = 'Email already exist, try another one';
    return sendError(res, [], message);
  }

  //CREATE NEW STAFF ID
  const staff_id = "STF" + uniqueToken();

  //ATTACH DEPARTMENT TO STAFF
  const department = await Department.findOne({ name: staff_department })
  Staff.findOneAndDelete()

  //SAVE NEW STAFF TO DB
  const staff = new Staff({...value, staff_id, staff_department: department, isVerified:true });
  const newStaff = await staff.save();
  if (!newStaff) {
    const message = 'Error! Try again';
    return sendError(res, [], message);
  }

  //LOGIN DETAILS
  const emailMessage = `<div>

      <p>Below are your login details</p>

      <h3>Email: ${email}</h3>
      <h3>Password: ${password}</h3>

      <p>All The Best</p>
    </div>
    `;
  const subject = 'Login Details';
  
  await sendMail(email, subject, emailMessage, (err, data) => {
    if (err) {
      const message = 'Error! Try again';
      return sendError(res, err, message);
    } else {
      const message = `Successfull`;
      return sendSuccess(res, data, message);
    }
  });
}

const getAll = (req, res) => {
  Staff.find({role:"staff"}).populate("staff_department", "name -_id").exec((err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const getOne = (req, res) => {
  Staff.findOne({_id:req.params.staffId}, (err, data) => {
    if (err) {
      sendError(res, err);
    } else {
      return sendSuccess(res, data);
    }
  });
};

const updateOne = (req, res) => {
  Staff.findByIdAndUpdate(
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
  Staff.findByIdAndRemove(req.params.staffId, (err, data) => {
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
