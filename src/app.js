const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const tasksRouter = require("./routes/tasks");

// Welcome route (matches your lab requirement)
app.get('/', (req, res) => {
  res.json({ message: "Welcome from Main branch" });
});

app.use("/tasks", tasksRouter);

// Database Connection Logic
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';

mongoose.connect(mongoUrl)
  .then(async () => {
    console.log("Connected to MongoDB successfully!");
    // This triggers the default task insertion once the DB is ready
    if (tasksRouter.seedDatabase) {
      await tasksRouter.seedDatabase();
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

if (require.main === module) { 
  app.listen(3000, () => console.log("API running on port 3000")); 
} 

module.exports = app;