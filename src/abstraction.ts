// See ABSTRACTION.md for documentation

interface PaymentMethod {
    pay(): void;
}

abstract class Payment {
    constructor(protected amount: number) {}

    abstract pay(): void;

    printReceipt(): void {
        console.log(`Payment of $${this.amount} has been processed.`);
    }
};

export class CreditCardPayment extends Payment implements PaymentMethod {
    constructor(amount: number, private cardNumber: string) {
        super(amount);
    }

    pay(): void {
        console.log(`
            Processing credit card payment of $${this.amount} 
            using card number ${this.cardNumber}.`
        );
        this.printReceipt();
    }
};

export class UpiPayment extends Payment implements PaymentMethod {
    constructor(amount: number, private upiId: string) {
        super(amount);
    };

    pay(): void {
        console.log(` 
            Processing UPI payment of $${this.amount} 
            using UPI ID ${this.upiId}.`
        );
        this.printReceipt();
    };
};