const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { loginSchema, registrationSchema } = require('../utils/validations/schemas/user');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    unique: true,
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  token: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetLink: {
    type: String,
    default: '',
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const saltRound = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, saltRound);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password);
};

UserSchema.statics.loginValidations = (data) => {
  return loginSchema.validate(data);
};

UserSchema.statics.regValidations = (data) => {
  return registrationSchema.validate(data);
};

module.exports = mongoose.model('User', UserSchema);
