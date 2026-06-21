const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = '/api/tasks';

function loadTasks() {
  fetch(API_URL)
    .then(function(response) { return response.json(); })
    .then(function(tasks) {
      taskList.innerHTML = '';
      tasks.forEach(renderTask);
    });
}

function renderTask(task) {
  const li = document.createElement('li');
  li.className = task.completed ? 'task-item completed' : 'task-item';

  li.innerHTML = '<input type="checkbox" data-id="' + task.id + '"' + (task.completed ? ' checked' : '') + '>' +
    '<span>' + task.title + '</span>' +
    '<button data-id="' + task.id + '">Supprimer</button>';

  taskList.appendChild(li);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title })
  }).then(function() {
    input.value = '';
    loadTasks();
  });
});

taskList.addEventListener('click', function(e) {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.type === 'checkbox') {
    fetch(API_URL + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: e.target.checked })
    }).then(function() { loadTasks(); });
  }

  if (e.target.tagName === 'BUTTON') {
    fetch(API_URL + '/' + id, { method: 'DELETE' })
      .then(function() { loadTasks(); });
  }
});

loadTasks();
