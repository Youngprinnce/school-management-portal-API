const joi = require('joi');

const loginSchema = joi.object().keys({
  email: joi.string().email().required().label('Email').trim(),
  password: joi.string().required().min(6).trim().label('Password'),
});

const registrationSchema = joi.object().keys({
  email: joi.string().email().required().label('Email').trim(),
  first_name: joi.string().required().alphanum().min(5).max(30).trim().label('First Name'),
  last_name: joi.string().required().alphanum().min(5).max(30).trim().label('Last Name'),
  middle_name: joi.string().alphanum().min(5).max(30).trim().label('Middle Name'),
  username: joi.string().alphanum().min(5).max(30).trim().label('Username'),
  dob: joi.string().required().label('dob'),
  role: joi.string().label('Role').valid('admin', 'student', 'staff'),
  gender: joi.string().trim().valid('male', 'female'),
  status: joi.string().label('Status').valid('single', 'married', 'divorced'),
  staff_level: joi.number().integer().label("Staff Llevel"),
  qualification: joi.string().label("Qualification"),
  staff_department: joi.string().label("Staff Department"),
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