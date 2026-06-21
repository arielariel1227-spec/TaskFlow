// taskModel.js
// Ce fichier définit à quoi ressemble une tâche dans notre application,
// et stocke les tâches en mémoire (elles sont perdues si le serveur redémarre).

let tasks = [];
let nextId = 1;

// Récupérer toutes les tâches
function getAllTasks() {
return tasks;
}

// Créer une nouvelle tâche
function createTask(title) {
const newTask = {
id: nextId++,
title: title,
completed: false,
createdAt: new Date().toISOString()
};
tasks.push(newTask);
return newTask;
}

// Mettre à jour une tâche (par exemple, la cocher comme terminée)
function updateTask(id, updates) {
const task = tasks.find(t => t.id === parseInt(id));
if (!task) return null;

if (updates.title !== undefined) task.title = updates.title;
if (updates.completed !== undefined) task.completed = updates.completed;

return task;
}

// Supprimer une tâche
function deleteTask(id) {
const index = tasks.findIndex(t => t.id === parseInt(id));
if (index === -1) return false;

tasks.splice(index, 1);
return true;
}

module.exports = {
getAllTasks,
createTask,
updateTask,
deleteTask
};
