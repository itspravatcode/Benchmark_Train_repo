class Employee {
    private salary: number;

    constructor(public name: string, public id: number, salary: number) {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    calculateBonus(): number {
        return 0;
    }
}

class Manager extends Employee {
    calculateBonus(): number {
        return this.getSalary() * 0.2;
    }
}

class Engineer extends Employee {
    calculateBonus(): number {
        return this.getSalary() * 0.15;
    }
}

class Intern extends Employee {
    calculateBonus(): number {
        return this.getSalary() * 0.5;
    }
}


const manager = new Manager("Pravat Bera", 1, 1200000);
console.log(`Manager Bonus: Rs.${manager.calculateBonus()}`);

const engineer = new Engineer("Pravat Bera", 2, 800000);
console.log(`Engineer Bonus: Rs.${engineer.calculateBonus()}`);

const intern = new Intern("Pravat Bera", 3, 500000);
console.log(`Intern Bonus: Rs.${intern.calculateBonus()}`);
