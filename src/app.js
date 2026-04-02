const express = require('express');
const mongoose = require('mongoose'); // <-- Import mongoose
const app = express();
app.use(express.json());

const tasksRouter = require("./routes/tasks");

// <-- Connect to MongoDB -->
// It uses the environment variable from docker-compose.yml
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.json({ message: "Welcome from Main branch" });
});

app.use("/tasks", tasksRouter);

if (require.main === module) { 
  app.listen(3000, () => console.log("API running on port 3000")); 
} 
module.exports = app;