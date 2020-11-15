const express = require('express');
const router = express.Router();

const {
    register,
} = require('../Controllers/studentController');

module.exports = () => {
    router.post("/", register)
    return router;
};
