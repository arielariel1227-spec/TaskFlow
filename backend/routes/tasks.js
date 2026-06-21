// tasks.js
// Ce fichier définit les routes (les “actions possibles”) liées aux tâches :
// récupérer, créer, modifier et supprimer une tâche.

const express = require(‘express’);
const router = express.Router();
const taskModel = require(’../models/taskModel’);

// GET /api/tasks → récupérer toutes les tâches
router.get(’/’, (req, res) => {
const tasks = taskModel.getAllTasks();
res.json(tasks);
});

// POST /api/tasks → créer une nouvelle tâche
router.post(’/’, (req, res) => {
const { title } = req.body;

if (!title || title.trim() === ‘’) {
return res.status(400).json({ error: ‘Le titre de la tâche est requis’ });
}

const newTask = taskModel.createTask(title);
res.status(201).json(newTask);
});

// PUT /api/tasks/:id → modifier une tâche (titre ou statut)
router.put(’/:id’, (req, res) => {
const { id } = req.params;
const updates = req.body;

const updatedTask = taskModel.updateTask(id, updates);

if (!updatedTask) {
return res.status(404).json({ error: ‘Tâche introuvable’ });
}

res.json(updatedTask);
});

// DELETE /api/tasks/:id → supprimer une tâche
router.delete(’/:id’, (req, res) => {
const { id } = req.params;
const success = taskModel.deleteTask(id);

if (!success) {
return res.status(404).json({ error: ‘Tâche introuvable’ });
}

res.status(204).send();
});

module.exports = router;
