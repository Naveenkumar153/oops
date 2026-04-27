
/**
 * Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.
 * In other words, if class B is a subclass of class A, then we should be able to replace A with B without breaking the functionality of the program.
 * LSP is about ensuring that a subclass can stand in for its superclass without causing errors or unexpected behavior. This means that the subclass should not violate any of the expectations set by the superclass.
 * LSP is crucial for maintaining the integrity of a class hierarchy and ensuring that code remains flexible and maintainable.
 * Violating LSP can lead to code that is difficult to understand, maintain, and extend, as it can introduce unexpected behavior when subclasses are used in place of their superclasses.
 * 
 * LSP Violation Example: Bird and Ostrich
 * In this example, we have a Bird class with a fly method. The Ostrich class extends Bird but overrides the fly method to throw an error, which violates LSP because an Ostrich cannot be substituted for a Bird without causing issues.
 * This design is flawed because it assumes that all birds can fly, which is not true in the case of ostriches.
 * To adhere to LSP, we should design our classes in a way that does not assume all subclasses will have the same behavior as the superclass.
 */

class Bird {
  fly(): void {
    console.log('Flying in the sky.');
  }
}

class Ostrich extends Bird {
  override fly(): void {
    throw new Error('Ostriches cannot fly.');  // 🚨 LSP broken here
  }
}


// Some function that trusts the Bird contract
function makeBirdFly(bird: Bird): void {
  bird.fly();  // Works for Eagle, Parrot — CRASHES for Ostrich
}

const eagle   = new Eagle();
const ostrich = new Ostrich();

makeBirdFly(eagle);    // ✅ "Flying in the sky."
makeBirdFly(ostrich);  // 💥 Uncaught Error: Ostriches cannot fly.

// Developer forced to add type checks — another code smell
function makeBirdFlyBadFix(bird: Bird): void {
  if (!(bird instanceof Ostrich)) {  // 🚨 Defensive check = LSP signal
    bird.fly();
  }
}


// LSP fix

abstract class Bird {
  constructor(protected name: string) {}

  eat(): void {
    console.log(`${this.name} is eating.`);
  }

  abstract makeSound(): void;  // All birds make sounds
}

// Separate interface for the flying CAPABILITY
interface Flyable {
  fly(): void;
  getMaxAltitude(): number;
}

// Separate interface for the swimming CAPABILITY
interface Swimmable {
  swim(): void;
}

class Eagle extends Bird implements Flyable {
  constructor() { super('Eagle'); }

  makeSound(): void { console.log('Screech!'); }

  fly(): void {
    console.log('Eagle soars at high altitude.');
  }

  getMaxAltitude(): number { return 3000; }
}


// ✅ Ostrich CANNOT fly — does NOT implement Flyable
// No exception thrown. No broken promise. No lies.
class Ostrich extends Bird {
  constructor() { super('Ostrich'); }

  makeSound(): void { console.log('Boom!'); }

  run(): void {
    console.log('Ostrich runs at 70 km/h.');  // What it CAN do
  }
}

// ✅ Penguin can swim but not fly
class Penguin extends Bird implements Swimmable {
  constructor() { super('Penguin'); }

  makeSound(): void { console.log('Squawk!'); }

  swim(): void {
    console.log('Penguin swims gracefully.');
  }
}

// ✅ This function only accepts things that CAN fly — type-safe at compile time
function makeFly(flyer: Flyable): void {
  flyer.fly();
  console.log(`Max altitude: ${flyer.getMaxAltitude()}m`);
}

const eagle   = new Eagle();
const ostrich = new Ostrich();

makeFly(eagle);    // ✅ Works perfectly
// makeFly(ostrich) — TypeScript compile ERROR. Cannot pass Ostrich to Flyable.
// 🎯 The violation is now caught at COMPILE TIME — not at runtime crash.

// ✅ LSP substitution test — passes
const flyers: Flyable[] = [new Eagle()];
flyers.forEach(f => f.fly());  // No instanceof. No crashes. No surprises.