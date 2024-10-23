// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addTopicSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  body: Joi.string().required(),
  image: Joi.object(),
});

const editTopicSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  body: Joi.string(),
  image: Joi.object(),
});

module.exports = {
  addTopicSchema,
  editTopicSchema,
};
