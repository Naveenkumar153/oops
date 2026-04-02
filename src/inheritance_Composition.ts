interface BarkBehavior {
  bark(): void;
}

class DogBark implements BarkBehavior {
  bark(): void {
    console.log("Woof!");
  }
}

class RobotBark implements BarkBehavior {
  bark(): void {
    console.log("Beep!");
  }
}

class Dog {
  constructor(private barkBehavior: BarkBehavior) {}

  bark(): void {
    this.barkBehavior.bark();
  }
}

class RobotDog {
  constructor(private barkBehavior: BarkBehavior) {}

  bark(): void {
    this.barkBehavior.bark();
  }
}

// Usage
const dog = new Dog(new DogBark());
const robotDog = new RobotDog(new RobotBark());

dog.bark(); // Woof!
robotDog.bark(); // Beep!