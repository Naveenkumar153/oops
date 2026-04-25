/*
    Open/Closed Principle (OCP)

    The Open/Closed Principle (OCP) states that software entities, such as classes, should be open for extension but closed for modification. This means you can add new functionality without altering existing code.
*/

/**
  OCP Violation Example: Area Calculator
    In this example, we have a class AreaCalculator that calculates the area of different shapes. If we want to add a new shape, we have to modify the AreaCalculator class, which violates OCP.
    
    Every time a new shape is added, AreaCalculator must be modified. That's the violation — a working class is touched to extend behaviour.
 */


class Rectangle {
    constructor(public width: number, public height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    };
};

class AreaCalculator {
    calculateArea(shape: Rectangle): number {
        return shape.calculateArea();
    };
};

// Usage
const rectangle = new Rectangle(5, 10);
const areaCalculator = new AreaCalculator();
console.log(areaCalculator.calculateArea(rectangle)); // Output: 50

// If we want to add a new shape, say Circle, we would have to modify AreaCalculator, which violates OCP.

class Circle {
    constructor(public radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    };
}

// To fix this, we can use an interface to allow for extension without modification:

interface Shape {
    calculateArea(): number;
}

class AreaCalculatorV2 {
    calculateArea(shape: Shape): number {
        return shape.calculateArea();
    };
};

// Now we can add new shapes without modifying AreaCalculatorV2:

class RectangleV2 implements Shape {
    constructor(public width: number, public height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    };
};

class CircleV2 implements Shape {
    constructor(public radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    };
};

// Usage
const rectangleV2 = new RectangleV2(5, 10);
const circleV2 = new CircleV2(7);
const areaCalculatorV2 = new AreaCalculatorV2();

console.log(areaCalculatorV2.calculateArea(rectangleV2)); // Output: 50
console.log(areaCalculatorV2.calculateArea(circleV2)); // Output: 153.938...    



/**
    Best practices
    With this extensible design in place, here are guidelines to ensure OCP compliance:

    Consider introducing abstract classes or interfaces to create flexible blueprints that classes can extend with new functionality.
    Allow subclasses to override methods to provide specific behaviors, such as unique area calculations for different shapes.
    Use polymorphism to treat objects of different classes, like various shapes, uniformly through a common interface or base class.
 * 
 */