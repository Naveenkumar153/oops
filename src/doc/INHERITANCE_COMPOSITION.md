# Inheritance vs Composition: Solving Tight Coupling

## Overview

**Composition** is an alternative to inheritance that achieves code reuse through object composition rather than class hierarchy. It provides better flexibility and avoids tight coupling.

## The Problem with Our Inheritance Example

```typescript
// ❌ PROBLEM: Inheritance Approach
class Animal {
    bark() { }
    eat() { }
}

class Dog extends Animal { }      // Makes sense - Dog IS-A Animal
class RobotDog extends Animal { } // Problematic - RobotDog IS-A Animal? Not really!
```

**Issues:**
- `RobotDog` is forced to implement `eat()` method
- A robot doesn't "eat" - it "charges"
- Violates semantic correctness
- Tight coupling to `Animal` class

## The Solution: Composition

**Composition** means building behavior through object composition rather than inheritance:

```typescript
// ✅ SOLUTION: Composition Approach
interface BarkBehavior {
    bark(): void;
}

interface EatBehavior {
    eat(): void;
}

class DogBark implements BarkBehavior {
    bark(): void {
        console.log("Woof! Woof!");
    }
}

class RobotBark implements BarkBehavior {
    bark(): void {
        console.log("Beep! Beep!");
    }
}

class Dog {
    constructor(
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

class RobotDog {
    constructor(
        private barkBehavior: BarkBehavior,
        private eatBehavior: EatBehavior
    ) {}
    
    bark(): void {
        this.barkBehavior.bark();
    }
    
    eat(): void {
        this.eatBehavior.eat(); // Now "eat" represents energy consumption
    }
}

// Usage
const dog = new Dog(new DogBark(), new DogEat());
const robotDog = new RobotDog(new RobotBark(), new RobotCharge());

dog.bark();      // Output: Woof! Woof!
robotDog.bark(); // Output: Beep! Beep!
```

## Comparison Chart

### Inheritance vs Composition

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| **Coupling** | ❌ Tight (IS-A relationship) | ✅ Loose (HAS-A relationship) |
| **Flexibility** | ❌ Rigid hierarchy | ✅ Flexible behavior mixing |
| **Runtime Changes** | ❌ Cannot change behavior | ✅ Can swap behaviors at runtime |
| **Code Reuse** | ⚠️ Through hierarchy | ✅ Through object composition |
| **Multiple Inheritance** | ❌ Not supported in TypeScript | ✅ Supported (implement multiple interfaces) |
| **Semantic Correctness** | ❌ Forced methods | ✅ Choose only needed behaviors |
| **Maintainability** | ❌ Changes break children | ✅ Changes isolated to behavior classes |
| **Testability** | ⚠️ Complex mocking | ✅ Easy to mock behaviors |
| **Liskov Principle** | ❌ Often violated | ✅ Always satisfied |

## How Composition Solves the Problems

### Problem 1: Forced Implementation
**Inheritance:** `RobotDog` must implement `eat()` even if it doesn't eat

**Composition:** `RobotDog` only uses behaviors it needs
```typescript
// Only compose behaviors that make sense
const robotDog = new RobotDog(new RobotBark(), new RobotCharge());
```

### Problem 2: Semantic Incorrectness
**Inheritance:** `robotDog.eat()` is misleading

**Composition:** Clear behavior through implementation
```typescript
class RobotCharge implements EatBehavior {
    eat(): void {
        console.log("Robot is charging"); // Clear meaning
    }
}
```

### Problem 3: Tight Coupling
**Inheritance:** Adding method to `Animal` affects all children

**Composition:** New behaviors are added independently
```typescript
// Add new behavior without touching existing code
class DogSleep implements SleepBehavior {
    sleep(): void {
        console.log("Dog is sleeping");
    }
}
```

### Problem 4: Multiple Inheritance
**Inheritance:** TypeScript doesn't support multiple inheritance

**Composition:** Implement multiple interfaces
```typescript
class SuperDog implements BarkBehavior, EatBehavior, SwimBehavior {
    constructor(
        private barkBehavior: BarkBehavior,
        private eatBehavior: EatBehavior,
        private swimBehavior: SwimBehavior
    ) {}
    
    bark() { this.barkBehavior.bark(); }
    eat() { this.eatBehavior.eat(); }
    swim() { this.swimBehavior.swim(); }
}
```

## Advantages of Composition

✅ **Flexibility** - Behaviors can be mixed and matched
✅ **Loose Coupling** - Changes to behaviors don't affect other classes
✅ **Runtime Adaptability** - Swap behaviors at runtime
✅ **Better Testing** - Easy to test with mock behaviors
✅ **Avoids Fragile Base Class Problem** - Child classes don't break with parent changes
✅ **Semantic Correctness** - Objects only have behaviors they truly need
✅ **Follows SOLID Principles** - Especially Open/Closed and Liskov Substitution

## When to Use Each

### Use Inheritance When:
- Clear "IS-A" relationship exists
- Sharing common base functionality
- Hierarchy is stable and unlikely to change
- Example: `Corgi` extends `Dog` extends `Animal`

### Use Composition When:
- "HAS-A" relationship is more appropriate
- Mixing different behaviors
- Need flexibility and runtime changes
- Avoiding forced method implementation
- Example: `Dog` has `BarkBehavior` and `EatBehavior`

## Real-World Example

### ❌ Bad: Inheritance
```typescript
class Vehicle {
    drive() { }
    fly() { }
    swim() { }
}

class Car extends Vehicle { }       // Car doesn't fly or swim!
class Airplane extends Vehicle { }  // Airplane doesn't swim!
class Boat extends Vehicle { }      // Boat doesn't fly!
```

### ✅ Good: Composition
```typescript
class Car {
    constructor(private driveBehavior: DriveBehavior) {}
    drive() { this.driveBehavior.drive(); }
}

class Airplane {
    constructor(private flyBehavior: FlyBehavior) {}
    fly() { this.flyBehavior.fly(); }
}

class AmphibiousVehicle {
    constructor(
        private driveBehavior: DriveBehavior,
        private swimBehavior: SwimBehavior
    ) {}
    drive() { this.driveBehavior.drive(); }
    swim() { this.swimBehavior.swim(); }
}
```

## Key Takeaway

**"Favor Composition over Inheritance"**

This principle from the Gang of Four Design Patterns emphasizes that composition provides:
- Better flexibility
- Looser coupling
- Easier maintenance
- Better code reuse

Composition is generally the safer, more flexible choice for most OOP designs.

## References

- Gang of Four Design Patterns
- SOLID Principles
- "Effective Java" - Item 18: Favor composition over inheritance
- "Head First Design Patterns"
