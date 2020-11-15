const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const uniqueToken = require('../utils/tokenGenerator');
const sendMail = require('../utils/emailService');

const register = async (req, res) => {
  // VALIDATE USER BEFORE SAVE
  const { error, value } = await User.regValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message);
  }

  //Destructure filtered value...
  const { email } = value;

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    const message = 'Email already exist, try another one';
    return sendError(res, [], message);
  }

  // CREATE TOKEN
  const token = uniqueToken();

  // CREATE EMAIL VERICATION MESSAGE
  const link = `<div>
      <p>Verification Token</p>

      <h3>${token}</h3>

      <p>All The Best</p>
    </div>
    `;
  const subject = 'Verification Token';

  //Save new student to database
  const user = new User({ ...value, token});
  const newUser = await user.save();
  if (!newUser) {
    const message = 'Error! Try again';
    return sendError(res, [], message);
  }

  //SEND EMAIL
  await sendMail(email, subject, link, (err, data) => {
    if (err) {
      const message = 'Error! Try again';
      return sendError(res, err, message);
    } else {
      const message = `Verification token has been sent to ${email}`;
      return sendSuccess(res, data, message);
    }
  });
};

const login = async (req, res) => {
  // VALIDATE USER BEFORE SAVE
  const { error, value } = await User.loginValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message);
  }

  const { email, password } = value;

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const user = await User.findOne({ email });
  if (!user) {
    const message = 'Email not found';
    return sendError(res, [], message);
  }

  //Check if user isVerified
  if (!user.isVerified) {
    const message = 'User account is not verified';
    return sendError(res, [], message);
  }

  //CHECK FOR PASSWORD BCRYPT
  const validPass = await user.comparePassword(password);
  if (!validPass) {
    const message = 'Invalid password';
    return sendError(res, [], message);
  }

  //Create Token for frontend Authentication
  const token = jwt.sign({ user }, process.env.LOGIN_TOKEN, {expiresIn:"1d"});

  const message = 'Login Successful';
  res.header('auth-token', token).json({ user, token, message });
};

const verify = async (req, res) => {
  //Retrive token from user
  const token = req.body.token;

  //Check user with the token
  const checktoken = await User.findOne({ token });
  if (!checktoken) {
    const message = 'Incorrect Token! Register again';
    return sendError(res, [], message);
  }

  //Find matching user for the token
  const user = await User.findOne({ _id: checktoken._id });
  if (!user) {
    const message = 'Error Occured';
    return sendError(res, [], message);
  }

  //Check if user had already been verified
  if (user.isVerified) {
    const message = 'This user has alredy been verified';
    return sendSuccess(res, [], message);
  }

  //Else, setIsverified to true and token to empty
  const setIsverified = await User.updateMany({ isVerified: true, token: '' });
  if (!setIsverified) {
    const message = 'Internal error! Try again';
    return sendError(res, [], message);
  }
  const message = 'Registration Success';
  return sendSuccess(res, [], message);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const user = await User.findOne({ email });
  if (!user) {
    const message = 'User with this email does not exist';
    return sendError(res, [], message);
  }

  // CREATE A TOKEN
  const token = uniqueToken();

  //UPDATE USER ACCOUNT WITH PASSWORD TOKEN
  const updateToken = await User.findOneAndUpdate({ email }, {token});
  if (!updateToken) {
    const message = 'Internal Error, Try again';
    return sendError(res, [], message);
  }

  // SEND TOKEN TO USER
  await sendMail(email, "Token", token, (err, data) => {
    if (err) {
      const message = 'reset password link error';
      return sendError(res, err, message);
    } else {
      const message = `A token has been sent to ${email}`;
      return sendSuccess(res, data, message);
    }
  });
};


const resetPassword = async (req, res) => {
  //Retrive token from URL
  const token = req.body.token;
  const password = req.body.password;

  //Check user with token
  const user = await User.findOne({ token });
  if (!user) {
    const message = 'Token is not correct';
    return sendError(res, err, message);
  }

  //HASH USER PASSWORD USING BCRYPT
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Update Password
  const updatePassword = await User.findOneAndUpdate({ token },{ password: hashedPassword, token: '' });
  if (!updatePassword) {
    const message = 'Error reseting password';
    return sendError(res, [], message);
  }

  const message = `Your password has been changed`;
  return sendSuccess(res, [], message);
};

const deleteOne = async (req, res) => {
  await User.findByIdAndRemove(req.params.userId, (err, data) => {
    if (err) {
      return sendError(res, err);
    } else {
      const message = 'User deleted successfully!';
      return sendSuccess(res, [], message);
    }
  });
};

const getAll = async (req, res) => {
  await User.find({"role":{"$ne":"admin"}},(err, data) => {
    if (err) {
      sendError(res, err);
    }
    sendSuccess(res, data)
  });
}

module.exports = {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
  deleteOne,
  getAll,
};
