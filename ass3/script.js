document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const fetchButton = document.getElementById("button-fetch");
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

  fetchButton.addEventListener("click", async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=1");
      const tasks = response.data;

      tasks.forEach(task => createTodo(task.title));
      saveTodos();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center draggable";
    li.draggable = true;
    li.innerHTML = `<span>${task}</span>
      <div>
        <button class="btn btn-sm btn-warning edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </div>`;
    ulTodo.appendChild(li);
    deleteAllButton.style.display = "block";
    saveTodos();
    addDragAndDrop();
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


      const deleteBtn = li.querySelector(".delete-btn");
      const editBtn = li.querySelector(".edit-btn");
      editBtn.textContent = "Save";
      deleteBtn.style.display = "none";
      
      input.focus();

      input.addEventListener("blur", () => saveEdit(input, span, li, editBtn, deleteBtn));
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveEdit(input, span, li, editBtn, deleteBtn);
      });
    }
  });

  const saveEdit = (input, span, li, editBtn, deleteBtn) => {
    const newText = input.value.trim();
    if (newText) {
      span.textContent = newText;
      li.replaceChild(span, input);
      editBtn.textContent = "Edit"; 
      deleteBtn.style.display = "inline-block"; 
      saveTodos();
    } else {
      li.remove();
      saveTodos();
    }
  };

  deleteAllButton.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
      ulTodo.innerHTML = "";
      localStorage.removeItem("todos");
      deleteAllButton.style.display = "none";
    }
  });

  const saveTodos = () => {
    const todos = [...document.querySelectorAll(".list-group-item span")].map(task => task.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
    deleteAllButton.style.display = todos.length ? "block" : "none";
  };

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(task => createTodo(task));
    addDragAndDrop();
  };

  const addDragAndDrop = () => {
    const listItems = document.querySelectorAll(".draggable");
    listItems.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        saveTodos();
      });
    });

    ulTodo.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(ulTodo, e.clientY);
      if (afterElement == null) {
        ulTodo.appendChild(draggingItem);
      } else {
        ulTodo.insertBefore(draggingItem, afterElement);
      }
    });
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };

  loadTodos();
});
