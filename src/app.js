const express = require('express');
const mongoose = require('mongoose'); // <-- Import mongoose
const app = express();
app.use(express.json());

const tasksRouter = require("./routes/tasks");

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb')
  .then(async () => {
    console.log("Connected to MongoDB successfully!");
    // Call the seed function here to ensure the DB is ready
    await tasksRouter.seedDatabase(); 
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/tasks", tasksRouter);

if (require.main === module) { 
  app.listen(3000, () => console.log("API running on port 3000")); 
} 
module.exports = app;