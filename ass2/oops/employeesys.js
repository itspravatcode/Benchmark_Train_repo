class Employee {
    #salary;

    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary;
    }

    getSalary() {
        return this.#salary;
    }

    calculateBonus() {
        return 0; // Base class doesn't define any specific bonus
    }
}

class Manager extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.2;
    }
}

class Engineer extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.15;
    }
}

class Intern extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.5;
    }
}

// Example Usage
const manager = new Manager("Pravat Bera", 1, 1200000);
console.log(`Manager Bonus: Rs.${manager.calculateBonus()}`);

const engineer = new Engineer("Pravat Bera", 2, 800000);
console.log(`Engineer Bonus: Rs.${engineer.calculateBonus()}`);

const intern = new Intern("Pravat Bera", 3, 500000);
console.log(`Intern Bonus: Rs.${intern.calculateBonus()}`);
