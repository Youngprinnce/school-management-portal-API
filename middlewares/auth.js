const jwt = require('jsonwebtoken');
const { sendError} = require('../utils/responseHandler');

const checkLoggedIn = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    const message = 'Unauthorized access';
    return sendError(res, [], message);
  }
  try {
    const user = jwt.verify(token, process.env.LOGIN_TOKEN);
    req.user = user.user;
    next();
  } catch (error) {
    const message = 'Invalid Token';
    sendError(res, error, message);
  }
};

const checkRole = (req, res, next) => {
  if (req.user === null) {
    const message = 'Access denied';
    return sendError(res, [], message);
  }

  if (req.user.role !== 'admin') {
    const message = 'Unauthorized request';
    return sendError(res, [], message);
  }

  next();
};

const dualRole = (req, res, next) => {
  if (req.user === null) {
    const message = 'Access denied';
    return sendError(res, [], message);
  }

  if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    const message = 'Unauthorized request';
    return sendError(res, [], message);
  }

  next();
};



module.exports = {
  checkLoggedIn,
  checkRole,
  dualRole
};
