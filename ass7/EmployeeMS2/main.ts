interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

interface Manager extends Employee {
  teamSize: number;
}

class Department {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  getTotalSalary(): number {
    return this.employees.reduce((total, emp) => total + emp.salary, 0);
  }

  listEmployees(): void {
    this.employees.forEach((emp) => {
      console.log(
        `ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: ₹${emp.salary}`
      );
    });
  }
}

class GenericStorage<T> {
  private storage: T[] = [];

  add(item: T): void {
    this.storage.push(item);
  }

  remove(item: T): void {
    this.storage = this.storage.filter((storedItem) => storedItem !== item);
  }

  getAll(): T[] {
    return this.storage;
  }
}

function updateSalary<T extends Employee>(employee: T, newSalary: number): T {
  return { ...employee, salary: newSalary };
}

const department = new Department();

department.addEmployee({
  id: 1,
  name: "Pravat Bera",
  position: "Developer",
  salary: 50000,
});
department.addEmployee({
  id: 2,
  name: "Anita Patil",
  position: "Designer",
  salary: 45000,
});
department.addEmployee({
  id: 3,
  name: "Vikram Patel",
  position: "Manager",
  salary: 70000,
});

department.listEmployees();
console.log("Total Salary: ₹", department.getTotalSalary());

department.removeEmployee(2);
console.log("After Removing Employee with ID 2:");
department.listEmployees();

console.log("Total Salary: ₹", department.getTotalSalary());
