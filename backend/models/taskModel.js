let tasks = [];
let nextId = 1;

function getAllTasks() {
  return tasks;
}

function createTask(title) {
  const newTask = {
    id: nextId,
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  nextId = nextId + 1;
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = tasks.find(function(t) {
    return t.id === parseInt(id);
  });
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(function(t) {
    return t.id === parseInt(id);
  });
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAllTasks: getAllTasks,
  createTask: createTask,
  updateTask: updateTask,
  deleteTask: deleteTask
};
