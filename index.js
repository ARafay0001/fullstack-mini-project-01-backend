// import express.js framwork for building the server
const express = require("express");

// Import CORS to allow frontend requests 
const cors = require("cors");

// Create express app so we can use express through app
const app = express();

// middle wares

// Allow requests from frontend will be modified later for specific authorized domains
app.use(cors());

// Parse incoming JSON data (VERY IMPORTANT)
app.use(express.json());

// ---------------- DUMMY DATA ----------------

let taskslist = [
  {
    id: 1,
    title: "Task One",
    completed: false,
  },
  {
    id: 2,
    title: "Task Two",
    completed: true,
  },
];
// Routes

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    data: taskslist,
  });
});

// POST → Add new task
app.post("/api/tasks", (req, res) => {
  // Get title from request body
  const { title } = req.body;

  // Validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  // Create new task object
  const newTask = {
    id: Date.now(), // simple unique id
    title,
    completed: false,
  };

  // Add task to list
  taskslist.push(newTask);

  // Send updated list back
  res.status(201).json({
    success: true,
    data: taskslist,
  });
});

// DELETE → Remove task by ID
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  // Remove task
  taskslist = taskslist.filter(task => task.id !== Number(id));

  res.status(200).json({
    success: true,
    data: taskslist,
  });
});

// ---------------- SERVER ----------------

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/api/tasks");
});
