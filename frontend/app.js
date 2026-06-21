// app.js
// Ce fichier gère l’interaction entre la page et notre API backend :
// afficher les tâches, en ajouter, les cocher, les supprimer.

const form = document.getElementById(‘task-form’);
const input = document.getElementById(‘task-input’);
const taskList = document.getElementById(‘task-list’);

const API_URL = ‘/api/tasks’;

// Récupère et affiche toutes les tâches au chargement de la page
async function loadTasks() {
const response = await fetch(API_URL);
const tasks = await response.json();

taskList.innerHTML = ‘’;
tasks.forEach(renderTask);
}

// Affiche une tâche dans la liste
function renderTask(task) {
const li = document.createElement(‘li’);
li.className = ‘task-item’ + (task.completed ? ’ completed’ : ‘’);

li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}"> <span>${task.title}</span> <button data-id="${task.id}">Supprimer</button>`;

taskList.appendChild(li);
}

// Ajoute une nouvelle tâche
form.addEventListener(‘submit’, async (e) => {
e.preventDefault();
const title = input.value.trim();
if (!title) return;

await fetch(API_URL, {
method: ‘POST’,
headers: { ‘Content-Type’: ‘application/json’ },
body: JSON.stringify({ title })
});

input.value = ‘’;
loadTasks();
});

// Gère les clics sur “cocher” ou “supprimer” (délégation d’événements)
taskList.addEventListener(‘click’, async (e) => {
const id = e.target.dataset.id;
if (!id) return;

// Cocher / décocher une tâche
if (e.target.type === ‘checkbox’) {
await fetch(`${API_URL}/${id}`, {
method: ‘PUT’,
headers: { ‘Content-Type’: ‘application/json’ },
body: JSON.stringify({ completed: e.target.checked })
});
loadTasks();
}

// Supprimer une tâche
if (e.target.tagName === ‘BUTTON’) {
await fetch(`${API_URL}/${id}`, { method: ‘DELETE’ });
loadTasks();
}
});

// Chargement initial
loadTasks();
