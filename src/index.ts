import { Person } from "./encapsulation.js";
import { CreditCardPayment, UpiPayment } from "./abstraction.js";
import { Dog, RobotDog } from './inheritance.js';

const person = new Person("Naveen", 30, true, 'Engineer');
console.log(person.getName); // Output: Naveen
console.log(person.getAge);  // Output: 30
console.log(person.getIsMarried);  // Output: true
console.log(person.getOccupation);  // Output: Engineer

const Payment = new CreditCardPayment(100, "1234-5678-9012-3456");
Payment.pay();
// Output:
// Processing credit card payment of $100 
// using card number 1234-5678-9012-3456.
// Payment of $100 has been processed.

const upiPayment = new UpiPayment(50, "musk@upi");
upiPayment.pay();
// Output:
// Processing UPI payment of $50 
// using UPI ID musk@upi.
// Payment of $50 has been processed.

const dog = new Dog("Buddy");
dog.bark(); // Output: Buddy is barking loudly
dog.eat();  // Output: Buddy is eating dog food

const robotDog = new RobotDog("RoboBuddy");
robotDog.bark(); // Output: RoboBuddy is barking electronically
robotDog.eat();  // Output: RoboBuddy is charging