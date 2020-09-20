const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = () => {
  router.get('/:token', async (req, res) => {
    const token = req.params.token;
    if (!token) {
      res.status(401).json({ message: 'Broken Link!!! Try Again' });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) {
        res.status(401).json({ message: 'Broken Link!!! Try Again' });
      } else {
        const { email } = verified;
        try {
          const check = await User.findOneAndUpdate(
            { email: email },
            { activated: true },
            { new: true, useFindAndModify: false }
          );
          res.json({ status: 'SUCCESS', message: 'Registration Successfull' });
        } catch (error) {
          res.status(500).json({ message: 'Internal Error! Something went wrong' });
        }
      }
    }
  });

  return router;
};
