const bodyParser = require("body-parser");
const tasksModel = require("../model/Taskmodel");
const express = require("express");
const app = express();

app.use(express.json());

const homeView = async (req, res) => {
  const taskview = await tasksModel.find();

  return res.send(taskview);
};

//   async(req, res) => {

const homeAdd = async (req, res) => {
  try {
    const taskadd = req.body;
    const taskdb = await tasksModel.create(taskadd);
    res.send(taskdb);

    res.status(201).json({ message: "Task created successfully", taskdb });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const homeById = async (req, res) => {
  const id = req.params.id;
  // const taskdbfind =await tasksModel.find((tasksModel)=>tasksModel.id == parseInt(id));

  const taskdbfind = await tasksModel.findById(id);

  res.status(200).json(taskdbfind);
};

const homeUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    // Find a single document by ID
    const task = await tasksModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    task.title = req.body.title;
    task.development = req.body.development;
    task.description = req.body.description;
    task.completed = req.body.completed;

    // Save the updated document
    await task.save();

    return res.json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  //return res.send(taskview);

  // const Tasks = await tasksModel.find((i) => i.id === parseInt(req.params.id));
  // if (!Tasks) return res.status(404).send("Item not found");

  // Tasks.title = req.body.title;
  // Tasks.development = req.body.development;
  // Tasks.description = req.body.description;
  // Tasks.completed = req.body.completed;

  // res.send(Tasks);
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the task by ID and delete it
    const deletedTask = await tasksModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  homeView,
  homeAdd,
  homeById,
  homeUpdate,
  deleteTask,
};
