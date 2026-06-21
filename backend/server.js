// server.js
// Ce fichier démarre notre serveur, connecte les routes des tâches,
// et sert les fichiers du frontend (HTML, CSS, JS).

const express = require(‘express’);
const cors = require(‘cors’);
const path = require(‘path’);
const taskRoutes = require(’./routes/tasks’);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Sert les fichiers du frontend (index.html, style.css, app.js)
app.use(express.static(path.join(__dirname, ‘..’, ‘frontend’)));

// Routes API pour les tâches
app.use(’/api/tasks’, taskRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
console.log(`Serveur TaskFlow démarré sur le port ${PORT}`);
});
