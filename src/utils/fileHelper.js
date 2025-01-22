const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../../tasks.json');

exports.readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

exports.writeTasksToFile = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};