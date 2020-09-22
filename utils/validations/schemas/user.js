const joi = require('joi');

const loginSchema = joi.object().keys({
  email: joi.string().email().required().label('Email').trim(),
  password: joi.string().required().min(6).trim().label('Password'),
});

const registrationSchema = joi.object().keys({
  email: joi.string().email().required().label('Email').trim(),
  first_name: joi.string().required().alphanum().min(5).max(30).trim().label('first_name'),
  last_name: joi.string().required().alphanum().min(5).max(30).trim().label('last_name'),
  username: joi.string().alphanum().min(5).max(30).trim().label('username'),
  age: joi.number().required().label('age'),
  gender: joi.string().trim().valid('male', 'female'),
  password: joi
    .string()
    .required()
    .min(8)
    .trim()
    .regex(/^(?:(?=.*\d)(?=.*[A-Z]).*)$/)
    .label('Password')
    .trim(),
});

module.exports = {
  loginSchema,
  registrationSchema,
};
