require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

// VALIDATION INITIALIZATION
const validations = [
  check('first_name').trim().isLength({ min: 5 }).escape().withMessage('name is required'),
  check('last_name').trim().isLength({ min: 5 }).escape().withMessage('name is required'),
  check('email').trim().isEmail().normalizeEmail().withMessage('A valid email address is required'),
  check('username').trim().escape(),
  check('password')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage('Password is required and should not be less than 8 characters'),
  check('age').trim().escape().isInt().withMessage('age is required'),
  check('gender').trim().escape(),
];

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('api/user/register');
  });

  router.post('/', validations, async (req, res) => {
    //VALIDATE USER BEFORE WE SAVE
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    //CHECK IF EMAIL EXIST IN THE DATABASE
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email already exist, try another one' });
    }

    //HASH USER PASSWORD USING BCRYPT
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET);

    //GATHER PURIFIED DATA INTO MONGODB
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      age: req.body.age,
      gender: req.body.gender,
      token: token,
    });

    // CREATE EMAIL VERICATION MESSAGE
    const link = `<div>
      <p>Hey ${user.username}

      <p>Click this link to verify email address</>

      <p>http://localhost:3000/api/user/confirmation/${token}</p>

      <p>All The Best</p>
    </div>
    `;

    //SAVE PURIFIED USER DATA
    try {
      const savedUser = await user.save();
      if (savedUser) {
        //EMAIL CONFIGURATION
        const auth = {
          auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
          },
        };
        const transporter = await nodemailer.createTransport(mailGun(auth));

        const mailOptions = {
          from: '"youngprinnce 👻" <' + process.env.EMAIL_ADDRESS + '>', // sender address
          to: `${user.email}`, // list of receivers
          subject: 'Verification Link ✔', // Subject line
          text: `Hello`, // plain text body
          html: link, // html body
        };

        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log('Error');
          } else {
            console.log('Message Sent');
          }
        });

        return res.status(200).json({
          Status: 'SUCCESS',
          message: `Verification token has been sent to ${user.email}`,
        });
      }
    } catch (err) {
      res
        .status(404)
        .json({ status: 'Failed', message: 'Registration failed', error: err.message });
    }
  });
  return router;
};
