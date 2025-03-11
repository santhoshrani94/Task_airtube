const express = require("express");
const mongoose = require("mongoose");
const tasksModel = require("../model/Taskmodel");
const {
  homeView,
  homeAdd,
  homeById,
  homeUpdate,
  deleteTask,
} = require("../Controllers/homeView");

const router = express.Router();

const { body, validationResult } = require("express-validator");

router.post(
  "/tasks",
  [
    body("title")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be 3-100 characters."),
    body("development")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Development field is required."),
    body("description")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters."),
    body("completed")
      .isBoolean()
      .withMessage("Completed must be true or false."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTask = new tasksModel(req.body);
      await newTask.save();
      res.status(201).json({ message: "Task created successfully", newTask });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/tasks", homeView);
router.get("/tasks/:id", homeById);
router.post("/tasks", homeAdd);
router.put("/tasks/:id", homeUpdate);
router.delete("/tasks/:id", deleteTask);
module.exports = router;
