
// ===== INHERITANCE APPROACH (Tightly Coupled) =====
// PROBLEM: The base class 'Animal' forces all subclasses to implement both bark() and eat()
// This creates TIGHT COUPLING - changes to the base class affect all subclasses
// RobotDog is an Animal, but it doesn't truly "eat" - it charges. This violates Liskov Substitution Principle

class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    bark() {
        console.log(`${this.name} is barking`);
    };

    eat() {
        console.log(`${this.name} is eating`);
    }
};

export class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    bark() {
        console.log(`${this.name} is barking loudly`);
    };

    eat() {
        console.log(`${this.name} is eating dog food`);
    };
};

export class RobotDog extends Animal {
    constructor(name: string) {
        super(name);
    }

    bark() {
        console.log(`${this.name} is barking electronically`);
    };

    eat(): void {
        // PROBLEM: RobotDog must implement eat() because it extends Animal
        // But a robot doesn't eat - it charges. This is semantically wrong!
        console.log(`${this.name} is charging`);
    }
};

// ===== COMPOSITION APPROACH (Loosely Coupled) =====
// SOLUTION: Compose behavior using interfaces instead of inheriting from a base class
// This allows Dog and RobotDog to have different behaviors without inheriting unwanted methods

interface BarkBehavior {
    bark(): void;
}

interface EatBehavior {
    eat(): void;
}

class DogBark implements BarkBehavior {
    constructor(private name: string) {}
    bark(): void {
        console.log(`${this.name} is barking loudly`);
    }
}

class RobotBark implements BarkBehavior {
    constructor(private name: string) {}
    bark(): void {
        console.log(`${this.name} is barking electronically`);
    }
}

class DogEat implements EatBehavior {
    constructor(private name: string) {}
    eat(): void {
        console.log(`${this.name} is eating dog food`);
    }
}

class RobotCharge implements EatBehavior {
    constructor(private name: string) {}
    eat(): void {
        // Now "eat" represents the energy consumption behavior
        console.log(`${this.name} is charging`);
    }
}

export class DogComposed {
    constructor(
        private name: string,
        private barkBehavior: BarkBehavior,
        private eatBehavior: EatBehavior
    ) {}

    bark(): void {
        this.barkBehavior.bark();
    }

    eat(): void {
        this.eatBehavior.eat();
    }
}

export class RobotDogComposed {
    constructor(
        private name: string,
        private barkBehavior: BarkBehavior,
        private eatBehavior: EatBehavior
    ) {}

    bark(): void {
        this.barkBehavior.bark();
    }

    eat(): void {
        this.eatBehavior.eat();
    }
}

// ===== USAGE COMPARISON =====
console.log("--- INHERITANCE APPROACH ---");
const inheritanceDog = new Dog("Buddy");
inheritanceDog.bark();
inheritanceDog.eat();

const inheritanceRobotDog = new RobotDog("T-800");
inheritanceRobotDog.bark();
inheritanceRobotDog.eat(); // Semantically misleading - it's not really eating

console.log("\n--- COMPOSITION APPROACH ---");
const compositionDog = new DogComposed("Buddy", new DogBark("Buddy"), new DogEat("Buddy"));
compositionDog.bark();
compositionDog.eat();

const compositionRobotDog = new RobotDogComposed("T-800", new RobotBark("T-800"), new RobotCharge("T-800"));
compositionRobotDog.bark();
compositionRobotDog.eat(); // Clear semantic meaning - charging behavior