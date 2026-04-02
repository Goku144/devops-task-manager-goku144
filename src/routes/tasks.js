const express = require("express");
const mongoose = require("mongoose"); // <-- Import mongoose
const router = express.Router();

// <-- 1. Define the Database Schema -->
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// <-- 2. Create the Model -->
const Task = mongoose.model('Task', taskSchema);

// <-- 3. Update GET route to Read from Database -->
router.get('/', async (req, res) => {
  try {
    // Task.find() reaches into MongoDB and grabs everything
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// <-- 4. Update POST route to Save to Database -->
router.post('/', async (req, res) => {
  try {
    let savedTasks;
    
    // Handle an array of tasks
    if(Array.isArray(req.body)) {
        savedTasks = await Task.insertMany(req.body);
    } 
    // Handle a single task
    else {
        const newTask = new Task({
            title: req.body.title,
            completed: req.body.completed || false
        });
        savedTasks = await newTask.save(); // Saves it permanently to MongoDB!
    }
    
    res.status(201).json(savedTasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to save task" });
  }
});

module.exports = router;