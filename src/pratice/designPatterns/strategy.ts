/**
 *  To illustrate the Strategy pattern in another domain, the following example uses an e-commerce payment system.

    Problem:  Imagine you're developing an e-commerce application that offers various payment methods, such as credit cards, PayPal, and bank transfers. Initially, you might implement each payment method directly within the checkout process. However, as the application grows, this approach can lead to a monolithic design where the payment processing logic becomes tightly coupled with the checkout system. This tight coupling makes it challenging to add new payment methods or modify existing ones without changing the core checkout code, which increases the risk of introducing bugs and makes the system harder to maintain.

    Solution:  To address this issue, the Strategy design pattern can be employed. This pattern suggests encapsulating each payment algorithm in a separate class, known as a strategy, and making them interchangeable. The main application, referred to as the context, maintains a reference to a strategy object and delegates the payment processing to this object. This design allows the application to switch between different payment methods, without modifying the core checkout logic.

    When to use

    The Strategy design pattern is particularly useful in scenarios:

     - When an application needs to select different algorithms or behaviors at runtime based on specific conditions, the Strategy pattern is a great fit.

     - When a class is cluttered with conditional statements to choose between different algorithm variations, the Strategy pattern simplifies things. It moves each algorithm into its own class, with all classes implementing the same interface. This lets the original object delegate the task to the right class without complex conditionals.

     - Use the Strategy pattern to keep your class's business logic separate from the implementation details of the tasks.
 */


interface PaymentStrategy {
    pay(amount: number): void;  
};

class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;
    private cardHolder: string;
    private cvv: string;
    private expiryDate: string;

    constructor(cardNumber: string, cardHolder: string, cvv: string, expiryDate: string) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }

    pay(amount: number): void {
        console.log(`Processing credit card payment of $${amount} for ${this.cardHolder}`);
        // Here you would add logic to process the payment through a payment gateway
    }
};

class PaypalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    pay(amount: number): void {
        console.log(`Processing PayPal payment of $${amount} for ${this.email}`);
        // Here you would add logic to process the payment through PayPal's API
    }
};

class BankTransferPayment implements PaymentStrategy {
    private accountNumber: string;
    private bankName: string;

    constructor(accountNumber: string, bankName: string) {
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }

    pay(amount: number): void {
        console.log(`Processing bank transfer payment of $${amount} from account ${this.accountNumber} at ${this.bankName}`);
        // Here you would add logic to process the payment through a bank transfer system
    }
};

class Checkout {
    private paymentStrategy!: PaymentStrategy;

    setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    processPayment(amount: number): void {
        if (!this.paymentStrategy) {
            console.log("No payment strategy set. Please select a payment method.");
            return;
        }
        this.paymentStrategy.pay(amount);
    }
};

// Usage
const checkout = new Checkout();

checkout.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456", "John Doe", "123", "12/25"));
checkout.processPayment(100);

checkout.setPaymentStrategy(new PaypalPayment("john.doe@example.com")); 
checkout.processPayment(200);

checkout.setPaymentStrategy(new BankTransferPayment("9876543210", "Bank of Example"));
checkout.processPayment(300);