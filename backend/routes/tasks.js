const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');

router.get('/', (req, res) => {
  const tasks = taskModel.getAllTasks();
  res.json(tasks);
});

router.post('/', (req, res) => {
  const title = req.body.title;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Le titre de la tache est requis' });
  }

  const newTask = taskModel.createTask(title);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const updatedTask = taskModel.updateTask(id, updates);

  if (!updatedTask) {
    return res.status(404).json({ error: 'Tache introuvable' });
  }

  res.json(updatedTask);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const success = taskModel.deleteTask(id);

  if (!success) {
    return res.status(404).json({ error: 'Tache introuvable' });
  }

  res.status(204).send();
});

module.exports = router;
