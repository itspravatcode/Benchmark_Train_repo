import { getAllTodos, deleteTodo, addTodo, updateTodo, deleteAllTodos } from './manageTodos.js';

document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const fetchButton = document.getElementById("button-fetch");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAllButton = document.getElementById("btn-delete-all");

  let editMode = false;
  let editElement = null;

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.id = task.id;
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span class="text-todo">${task.title}</span>
      <input type="text" class="form-control d-none edit-todo" id="edit-todo" />
      <div>
        <button class="btn btn-sm btn-warning">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </div>
    `;
    ulTodo.appendChild(li);
    deleteAllButton.style.display = "block";
  };

  const loadAllTodos = async () => {
    const allTodos = await getAllTodos(7);
    allTodos.forEach(task => createTodo(task));
  };

  const deleteAllTodo = async () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      const res = await deleteAllTodos(ulTodo.children);
      ulTodo.innerHTML = "";
      alert(res);
    }
  };

  const updateTodoEl = async (e) => {
    const li = e.target.closest(".list-group-item");
    const taskTextEl = li.querySelector(".text-todo");
    const editTaskEl = li.querySelector(".edit-todo");
    const oldTaskText = taskTextEl.textContent;

    if (e.target.textContent === "Edit") {
      taskTextEl.classList.add("d-none");
      editTaskEl.classList.remove("d-none");
      editTaskEl.value = oldTaskText;
      editTaskEl.focus();
      e.target.textContent = "Update";
    } else {
      const newTaskText = editTaskEl.value;
      editTaskEl.classList.add("d-none");
      taskTextEl.classList.remove("d-none");
      taskTextEl.textContent = newTaskText;
      e.target.textContent = "Edit";
      const res = await updateTodo(li.id, oldTaskText, newTaskText);
      alert(res);
    }
  };

  const addNewTask = async () => {
    const text = inputTodo.value.trim();
    if (!text) return;

    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo({ id: ulTodo.children.length, title: text });
      const res = await addTodo(text);
      alert(res);
    }

    inputTodo.value = "";
  };

  buttonTodo.addEventListener("click", addNewTask);
  fetchButton.addEventListener("click", loadAllTodos);
  deleteAllButton.addEventListener("click", deleteAllTodo);

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      deleteTodo(li.id);
      li.remove();
    }

    if (e.target.classList.contains("btn-warning")) {
      updateTodoEl(e);
    }
  });
});
