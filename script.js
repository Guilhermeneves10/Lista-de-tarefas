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
        <button onclick="deleteTask(${index})">🗑️</button>
      `;

      list.appendChild(li);
    });

  // Counter
  const counterDiv = document.getElementById("counter") || document.createElement("div");
  counterDiv.id = "counter";
  counterDiv.textContent = `Total de tarefas: ${tasks.length}`;
  if (!document.getElementById("counter")) {
    document.querySelector(".container").insertBefore(counterDiv, list);
  }

  // Remove all button
  if (tasks.length > 0) {
    const removeAllBtn = document.getElementById("removeAllBtn") || document.createElement("button");
    removeAllBtn.id = "removeAllBtn";
    removeAllBtn.textContent = "Remover tudo";
    removeAllBtn.onclick = removeAllTasks;
    if (!document.getElementById("removeAllBtn")) {
      document.querySelector(".container").appendChild(removeAllBtn);
    }
  } else {
    const btn = document.getElementById("removeAllBtn");
    if (btn) btn.remove();
  }
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") {
    alert("Escreva uma tarefa!");
    return;
  }

  const trimmed = input.value.trim();
  if (tasks.some(task => task.text.trim().toLowerCase() === trimmed.toLowerCase())) {
    alert("Tarefa já existe!");
    return;
  }

  tasks.push({
    text: trimmed,
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

function removeAllTasks() {
  tasks = [];
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
