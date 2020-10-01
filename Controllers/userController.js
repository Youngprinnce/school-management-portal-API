const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const uniqueToken = require('../utils/tokenGenerator');
const sendMail = require('../utils/emailService');

const registerUser = async (req, res) => {
  // VALIDATE USER BEFORE SAVE
  const { error, value } = await User.regValidations(req.body);
  if (error) {
    return sendError(res, error.details[0].message);
  }

  //Destructure filtered value...
  const { username, email } = value;

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    const message = 'Email already exist, try another one';
    return sendError(res, [], message);
  }

  // CREATE AND ASSIGN A TOKEN
  const token = uniqueToken();

  // CREATE EMAIL VERICATION MESSAGE
  const link = `<div>
      <p>Hey ${username}

      <p>Verification Token</p>

      <h3>${token}</h3>

      <p>All The Best</p>
    </div>
    `;
  const subject = 'Verification Token';

  //Save new user to database
  const user = new User({ ...value, token });
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
      return sendSuccess(res, [], message);
    }
  });
};

const loginUser = async (req, res) => {
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
  const token = jwt.sign({ _id: user._id }, process.env.LOGIN_TOKEN);

  const message = 'Login Successful';
  return sendSuccess(res, { user, token }, message);
};

const activateUser = async (req, res) => {
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

const userForgotPassword = async (req, res) => {
  const { email } = req.body;

  //CHECK IF EMAIL EXIST IN THE DATABASE
  const user = await User.findOne({ email });
  if (!user) {
    const message = 'User with this email does not exist';
    return sendError(res, [], message);
  }

  // CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.FORGOT_PASSWORD_TOKEN, {
    expiresIn: '20m',
  });

  // CREATE EMAIL PASSWORD RESET MESSAGE
  const link = `<div>

      <p>Click this link to reset password</>

      <p>${process.env.CLIENT_URL}/api/resetpassword/${token}</p>

      <p>All The Best</p>
    </div>
    `;

  const subject = 'Password rest Link ✔';

  //SEND EMAIL
  const resetLink = await User.updateOne({ resetLink: token });
  if (!resetLink) {
    const message = 'reset password link error';
    return sendError(res, [], message);
  }

  try {
    await sendMail(email, subject, link);
    const message = `Password reset link has been sent to ${email}`;
    return sendSuccess(res, [], message);
  } catch (error) {
    const message = 'reset password link error';
    return sendError(res, err, message);
  }
};

const resetUserPassword = async (req, res) => {
  //Retrive token from URL
  const token = req.params.token;
  const password = req.body.password;

  //Verify token
  const verified = await jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN);
  if (!verified) {
    const message = 'Incorrect or Expired Link! Register Again';
    return sendError(res, [], message);
  }

  //Destructure user data from...
  const { _id } = verified;

  //Check user with token
  const user = await User.findOne({ resetLink: token });
  if (!user) {
    const message = 'User with this token does not exist';
    return sendError(res, err, message);
  }

  //HASH USER PASSWORD USING BCRYPT
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Update Password
  const updatePassword = await User.findByIdAndUpdate(
    { _id },
    { password: hashedPassword, resetLink: '' }
  );
  if (!updatePassword) {
    const message = 'Error reseting password';
    return sendError(res, [], message);
  }

  const message = `Your password has been changed`;
  return sendSuccess(res, [], message);
};

module.exports = {
  registerUser,
  loginUser,
  activateUser,
  userForgotPassword,
  resetUserPassword,
};
