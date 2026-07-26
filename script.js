const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


let nextId = 1;

const tasks = [
  { id: nextId++, text: "Book the campus venue", completed: false },
  { id: nextId++, text: "Print event flyers", completed: false },
  { id: nextId++, text: "Confirm guest speakers", completed: false },
];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = String(task.id);

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(task.id));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeTask(task.id));

    li.append(text, completeBtn, removeBtn);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({ id: nextId++, text: trimmed, completed: false });
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  renderTasks();
}

function removeTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
