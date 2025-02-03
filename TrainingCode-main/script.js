document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAllButton = document.getElementById("btn-delete-all");

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value.trim();
    if (text) {
      createTodo(text);
      inputTodo.value = "";
      saveTodos();
    }
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${task}</span>
      <div>
        <button class="btn btn-sm btn-warning edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </div>`;
    ulTodo.appendChild(li);
    deleteAllButton.style.display = "block";
    saveTodos();
  };

  ulTodo.addEventListener("click", (e) => {
    const li = e.target.closest(".list-group-item");
    if (!li) return;

    if (e.target.classList.contains("delete-btn")) {
      li.remove();
      saveTodos();
    }

    if (e.target.classList.contains("edit-btn")) {
      const span = li.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.className = "form-control form-control-sm";
      li.replaceChild(input, span);
      input.focus();

      input.addEventListener("blur", () => saveEdit(input, span, li));
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveEdit(input, span, li);
      });
    }
  });

  deleteAllButton.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
      ulTodo.innerHTML = "";
      localStorage.removeItem("todos");
      deleteAllButton.style.display = "none";
    }
  });

  const saveEdit = (input, span, li) => {
    const newText = input.value.trim();
    if (newText) {
      span.textContent = newText;
      li.replaceChild(span, input);
      saveTodos();
    } else {
      li.remove();
      saveTodos();
    }
  };

  const saveTodos = () => {
    const todos = [...document.querySelectorAll(".list-group-item span")].map(task => task.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
    deleteAllButton.style.display = todos.length ? "block" : "none";
  };

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(task => createTodo(task));
  };

  loadTodos();
});
