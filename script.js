let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.done;
      if (filter === "pending") return !task.done;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span onclick="toggleTask(${index})" class="${task.done ? 'completed' : ''}">
          ${task.text}
        </span>
        <button onclick="deleteTask(${index})">X</button>
      `;

      list.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

// carregar tarefas ao abrir
renderTasks();

document.getElementById("taskInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
