abstract class Payment {
    constructor(public amount: number, public date: string) {}

    abstract processPayment(): string;
}

class CreditCardPayment extends Payment {
    private cardNumber: string;
    public cardHolderName: string;

    constructor(amount: number, date: string, cardNumber: string, cardHolderName: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    processPayment(): string {
        return `Processing credit card payment of Rs.${this.amount} on ${this.date} for ${this.cardHolderName}.`;
    }
}

class PayPalPayment extends Payment {
    public paypalEmail: string;

    constructor(amount: number, date: string, paypalEmail: string) {
        super(amount, date);
        this.paypalEmail = paypalEmail;
    }

    processPayment(): string {
        return `Processing PayPal payment of Rs.${this.amount} on ${this.date} for ${this.paypalEmail}.`;
    }
}

class CryptoPayment extends Payment {
    public walletAddress: string;

    constructor(amount: number, date: string, walletAddress: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }

    processPayment(): string {
        return `Processing crypto payment of Rs.${this.amount} on ${this.date} to wallet ${this.walletAddress}.`;
    }
}


const creditCard = new CreditCardPayment(5000, "2025-02-04", "4321-5678-9876-5432", "Pravat Bera");
console.log(creditCard.processPayment());

const paypal = new PayPalPayment(3000, "2025-02-04", "pravatbera@example.com");
console.log(paypal.processPayment());

const crypto = new CryptoPayment(10000, "2025-02-04", "0xDEF123ABC789XYZ");
console.log(crypto.processPayment());
