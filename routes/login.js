const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const validations = [
  check('email').trim().isEmail().normalizeEmail().withMessage('A valid email address is required'),
  check('password').trim().escape(),
];

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('api/user/login');
  });

  router.post('/', validations, async (req, res) => {
    //VALIDATE USER BEFORE WE SAVE
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    //CHECK IF EMAIL EXIST IN THE DATABASE
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    //CHECK FOR PASSWORD BCRYPT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    //CHECK IF USER VERIFED EMAIL ADDRESS
    const checkActivted = await User.findOne({ activated: false });
    if (checkActivted) {
      return res.status(200).json({
        user: user,
        message: 'Dear user, your account is not activated, please check your email and activate',
      });
    } else {
      res.status(200).json({ user: user, status: 'SUCCESS', message: 'Login Successfull.' });
    }
  });
  return router;
};
