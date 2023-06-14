const Joi = require("joi");

const taskSchema = Joi.object({
  name: Joi.string().required(),
  priority: Joi.string().required().valid("1", "2", "3"),
  dependency: Joi.string().allow(null).optional(),
});
module.exports = { taskSchema };
