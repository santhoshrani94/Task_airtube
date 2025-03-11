const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const Joi = require("joi");
// const

const TaskScheme = new mongoose.Schema({
  // title: { type: String, required: [true,"Enter the title"] },
  title: {
    type: "String",
    required: true,
  },

  development: Joi.string().min(3).max(100).required(),
  description: {
    type: String,
    required: true,
  },
  completed: Joi.boolean().required(),
});

const validateTask = (req, res, next) => {
  const { error } = TaskScheme.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateTask;
module.exports = mongoose.model("Tasks", TaskScheme);
