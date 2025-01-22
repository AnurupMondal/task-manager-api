const { readTasksFromFile, writeTasksToFile } = require('../utils/fileHelper');

exports.getAllTasks = (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const tasks = readTasksFromFile();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
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
    updated_at: new Date(),
  };

  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const { title, description, status } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updated_at: new Date(),
  };

  writeTasksToFile(tasks);
  res.json(tasks[taskIndex]);
};

exports.deleteTask = (req, res) => {
  let tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  writeTasksToFile(tasks);
  res.json({ message: "Task deleted successfully" });
};