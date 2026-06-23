const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskElement = createTaskElement(task.text, null);
    if (task.completed) {
      taskElement.querySelector("span").classList.add("completed");
    }
    taskList.appendChild(taskElement);
  });
}

function createTaskElement(taskText, dateTime) {
  const li = document.createElement("li");
  li.className = "task";

  const taskContent = document.createElement("span");
  taskContent.textContent = `${taskText} ${dateTime ? " - " + dateTime : ""}`;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    taskContent.classList.toggle("completed");
    saveTasks();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏";
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", taskText);
    if (newTask) {
      taskContent.textContent = `${newTask} ${dateTime ? " - " + dateTime : ""}`;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(actions);

  return li;
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const dateTime = taskDateTime.value;
  if (taskText) {
    const taskElement = createTaskElement(taskText, dateTime);
    taskList.appendChild(taskElement);
    saveTasks();
    taskInput.value = "";
    taskDateTime.value = "";
  }
});

function filterTasks(type) {
  const tasks = document.querySelectorAll(".task span");
  tasks.forEach(task => {
    if (type === "all") {
      task.parentElement.style.display = "flex";
    } else if (type === "completed" && !task.classList.contains("completed")) {
      task.parentElement.style.display = "none";
    } else if (type === "pending" && task.classList.contains("completed")) {
      task.parentElement.style.display = "none";
    } else {
      task.parentElement.style.display = "flex";
    }
  });
}
S

