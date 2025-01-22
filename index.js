const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from the JSON file
const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write tasks to the JSON file
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

// GET a task by ID
app.get('/api/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST: Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const tasks = readTasksFromFile();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    status,
    created_at: new Date(),
    updated_at: new Date()
  };

  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).json(newTask);
});

// PUT: Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const { title, description, status } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updated_at: new Date()
  };

  writeTasksToFile(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE: Remove a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  writeTasksToFile(tasks);
  res.json({ message: "Task deleted successfully" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});