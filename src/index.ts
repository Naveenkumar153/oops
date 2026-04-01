import { Person } from "./encapsulation.js";

const person = new Person("Naveen", 30, true, 'Engineer');
console.log(person.getName); // Output: Naveen
console.log(person.getAge);  // Output: 30
console.log(person.getIsMarried);  // Output: true
console.log(person.getOccupation);  // Output: Engineer