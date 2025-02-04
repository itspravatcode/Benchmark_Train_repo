class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }

    processPayment() {
        throw new Error("processPayment() must be implemented in subclasses");
    }
}

class CreditCardPayment extends Payment {
    #cardNumber;

    constructor(amount, date, cardNumber, cardHolderName) {
        super(amount, date);
        this.#cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    processPayment() {
        return `Processing credit card payment of Rs.${this.amount} on ${this.date} for ${this.cardHolderName}.`;
    }
}

class PayPalPayment extends Payment {
    constructor(amount, date, paypalEmail) {
        super(amount, date);
        this.paypalEmail = paypalEmail;
    }

    processPayment() {
        return `Processing PayPal payment of Rs.${this.amount} on ${this.date} for ${this.paypalEmail}.`;
    }
}

class CryptoPayment extends Payment {
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }

    processPayment() {
        return `Processing crypto payment of Rs.${this.amount} on ${this.date} to wallet ${this.walletAddress}.`;
    }
}

// Example Usage
const creditCard = new CreditCardPayment(5000, "2025-02-04", "4321-5678-9876-5432", "Pravat Bera");
console.log(creditCard.processPayment());

const paypal = new PayPalPayment(3000, "2025-02-04", "pravat.bera@example.com");
console.log(paypal.processPayment());

const crypto = new CryptoPayment(10000, "2025-02-04", "0xDEF123ABC789XYZ");
console.log(crypto.processPayment());
