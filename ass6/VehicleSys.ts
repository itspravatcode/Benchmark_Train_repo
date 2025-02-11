class Vehicle {
    constructor(
        public brand: string,
        public model: string,
        public rentPricePerDay: number
    ) {}

    calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    calculateRentalCost(days: number): number {
        let total = super.calculateRentalCost(days);
        if (days > 7) total *= 0.9; // 10% discount for rentals over 7 days
        return total;
    }
}

class Bike extends Vehicle {
    calculateRentalCost(days: number): number {
        let total = super.calculateRentalCost(days);
        if (days > 5) total *= 0.85; // 15% discount for rentals over 5 days
        return total;
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days: number): number {
        let total = super.calculateRentalCost(days);
        if (days > 3) total *= 0.8; // 20% discount for rentals over 3 days
        return total;
    }
}


const car = new Car("Honda", "City", 3000);
console.log(`Car Rental for 10 days: Rs.${car.calculateRentalCost(10)}`);

const bike = new Bike("Royal Enfield", "Classic 350", 1000);
console.log(`Bike Rental for 6 days: Rs.${bike.calculateRentalCost(6)}`);

const truck = new Truck("Ashok Leyland", "Ecomet", 7000);
console.log(`Truck Rental for 4 days: Rs.${truck.calculateRentalCost(4)}`);
