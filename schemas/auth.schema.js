// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const signUpSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(4).required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  username: Joi.string().min(2).required(),
  phoneNumber: Joi.string().min(11).required(),
  role: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().min(6).email(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
