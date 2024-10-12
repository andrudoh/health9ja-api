// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addLevelSchema = Joi.object({
  name: Joi.string().required(),
});

const editLevelSchema = Joi.object({
  name: Joi.string(),
});

module.exports = {
  addLevelSchema,
  editLevelSchema,
};
