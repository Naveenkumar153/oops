# Inheritance in TypeScript

## Overview

Inheritance is a fundamental OOP concept where a class (child/derived class) extends another class (parent/base class) to reuse and extend functionality. However, it can lead to **tight coupling** when not used carefully.

## What is Inheritance?

Inheritance allows a class to inherit properties and methods from a parent class:

```typescript
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    bark() {
        console.log(`${this.name} is barking`);
    }
    
    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    bark() {
        console.log(`${this.name} is barking loudly`);
    }
    
    eat() {
        console.log(`${this.name} is eating dog food`);
    }
}

class RobotDog extends Animal {
    bark() {
        console.log(`${this.name} is barking electronically`);
    }
    
    eat() {
        // PROBLEM: RobotDog must implement eat() even though it doesn't eat!
        console.log(`${this.name} is charging`);
    }
}
```

## The Problem: Tight Coupling

### What is Tight Coupling?

Tight coupling occurs when a child class is heavily dependent on its parent class structure. Changes to the parent class force updates in all child classes.

### Issues with Inheritance:

| Issue | Description | Example |
|-------|-------------|---------|
| **Forced Implementation** | Child classes must implement all parent methods, even if irrelevant | `RobotDog` must implement `eat()` |
| **Semantic Incorrectness** | Methods may not make logical sense for all subclasses | A robot doesn't truly "eat" |
| **Liskov Substitution Violation** | Subclasses cannot reliably substitute parent class | `RobotDog.eat()` behavior is misleading |
| **Rigid Hierarchy** | Changing the parent class affects all children | Adding a new method breaks existing code |
| **Single Inheritance Limitation** | A class can only extend one parent | Cannot inherit from multiple classes |
| **Code Duplication** | Similar patterns repeated across subclasses | Same constructor pattern in Dog and RobotDog |

## Real-World Problem Scenario

Imagine you have:
- `Dog` → eats dog food, barks loudly
- `RobotDog` → charges, barks electronically

Both inherit from `Animal`, but:
- `RobotDog` doesn't truly "eat" - it charges
- If we add a `sleep()` method to `Animal`, `RobotDog` needs to implement it too (even if robots don't sleep)
- If we add a `reproduce()` method, it doesn't make sense for `RobotDog`

## When to Use Inheritance?

✅ **Good Use Cases:**
- Clear "is-a" relationship (Dog IS-A Animal)
- Shared common behavior that truly applies to all children
- Stable hierarchy (rarely changes)

❌ **Avoid When:**
- The relationship is weak or unclear
- Only sharing a few methods
- Different subclasses have different behaviors
- Multiple inheritance is needed

## Solution: Use Composition

See **INHERITANCE_COMPOSITION.md** for how to solve these problems using composition instead.

## Key Takeaways

1. **Inheritance creates tight coupling** between parent and child classes
2. **Changes to parent affect all children** - this is fragile
3. **Forced method implementation** leads to semantic incorrectness
4. **Composition is often a better choice** for flexible, maintainable code
5. **"Favor Composition over Inheritance"** - Gang of Four Design Patterns

## References

- Liskov Substitution Principle (SOLID)
- Gang of Four Design Patterns
- "Effective Java" - Item 18: Favor composition over inheritance
