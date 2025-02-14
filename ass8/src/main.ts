import { Expense } from "./Expense";


const expenseForm = document.getElementById("expense-form") as HTMLFormElement;

let expenses: Expense[] = loadFromLocalStorage("expenses");

function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key: string): any[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function addExpense(amount: number, category: string, date: string, description: string) {
  if (amount <= 0) {
    alert("Amount should be greater than zero.");
    return;
  }
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    amount,
    category,
    date,
    description,
  };
  expenses.push(newExpense);
  saveToLocalStorage("expenses", expenses);
  alert("Expense added successfully!");
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = +(document.getElementById("amount") as HTMLInputElement).value;
  const category = (document.getElementById("category") as HTMLSelectElement).value;
  const date = (document.getElementById("date") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLInputElement).value;

  addExpense(amount, category, date, description);
  expenseForm.reset();
});
