import { Expense } from "./Expense";


const expenseList = document.getElementById("expense-list") as HTMLDivElement;
const sortOptions = document.getElementById("sort-options") as HTMLSelectElement;
const filterCategory = document.getElementById("filter-category") as HTMLSelectElement;
const timeFilter = document.getElementById("time-filter") as HTMLSelectElement;
const totalAmount = document.getElementById("total-amount") as HTMLSpanElement;

let expenses: Expense[] = loadFromLocalStorage("expenses");


function loadFromLocalStorage(key: string): any[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToLocalStorage(key: string, data: any[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}


function renderExpenses(filteredExpenses: Expense[] = expenses) {
  expenseList.innerHTML = "";
  let total = 0;
  filteredExpenses.forEach((expense) => {
    total += expense.amount;
    const expenseCard = document.createElement("div");
    expenseCard.classList.add("card", "mb-3", "shadow-sm");
    expenseCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">₹${expense.amount}</h5>
        <p class="card-text"><strong>Category:</strong> ${expense.category}</p>
        <p class="card-text"><strong>Date:</strong> ${new Date(expense.date).toLocaleDateString()}</p>
        <p class="card-text"><strong>Description:</strong> ${expense.description}</p>
        <button class="btn btn-danger btn-sm" data-id="${expense.id}">Delete</button>
      </div>
    `;
    expenseList.appendChild(expenseCard);
  });
  totalAmount.textContent = total.toString();


  document.querySelectorAll(".btn-danger").forEach((button) =>
    button.addEventListener("click", (e) => {
      const id = (e.target as HTMLButtonElement).dataset.id!;
      deleteExpense(id);
    })
  );
}


function filterByTime(criteria: string) {
  const now = new Date();
  let filteredExpenses = expenses;

  if (criteria === "monthly") {
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  } else if (criteria === "yearly") {
    const currentYear = now.getFullYear();
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear;
    });
  }

  renderExpenses(filteredExpenses);
}


function deleteExpense(id: string) {
  expenses = expenses.filter((expense) => expense.id !== id);
  saveToLocalStorage("expenses", expenses);
  renderExpenses();
}


function sortExpenses(criteria: string) {
  expenses.sort((a, b) => {
    if (criteria === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (criteria === "amount") {
      return a.amount - b.amount;
    }
    return 0;
  });
  renderExpenses();
}


function filterExpenses(category: string) {
  const filteredExpenses =
    category === "all" ? expenses : expenses.filter((exp) => exp.category === category);
  renderExpenses(filteredExpenses);
}


sortOptions.addEventListener("change", (e) => sortExpenses((e.target as HTMLSelectElement).value));
filterCategory.addEventListener("change", (e) => filterExpenses((e.target as HTMLSelectElement).value));
timeFilter.addEventListener("change", (e) => filterByTime((e.target as HTMLSelectElement).value));


renderExpenses();
