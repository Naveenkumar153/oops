

/**
 * DIP (Dependency Inversion Principle) states that high-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.
 * In other words, the principle emphasizes that the design of software should be based on abstractions rather than concrete implementations. This allows for more flexible and maintainable code, as changes to low-level modules will not affect high-level modules as long as the abstractions remain consistent.
 * 
 * 
 * DIP Violation Example: Light Switch and Light Bulb
 * In this example, we have a LightSwitch class that directly depends on a LightBulb class. This creates a tight coupling between the two classes, which violates the Dependency Inversion Principle. If we want to change the type of light bulb or add new types of light sources, we would have to modify the LightSwitch class, which is not ideal.
 * 
 * To adhere to DIP, we can introduce an abstraction (interface) for the light source, allowing the LightSwitch to depend on the abstraction rather than the concrete implementation of the LightBulb. This way, we can easily swap out different types of light sources without modifying the LightSwitch class.
 * 
 * 
 * 
 */

class LightBulb {
  turnOn(): void {
    console.log('LightBulb is on.');
  }
  turnOff(): void {
    console.log('LightBulb is off.');
  }
};



// High-level module — DIRECTLY depends on LightBulb concrete class
class Switch {
  private bulb: LightBulb;  // 🚨 Hardwired to one specific device

  constructor(bulb: LightBulb) {  // 🚨 Only accepts LightBulb — nothing else
    this.bulb = bulb;
  }

  operate(): void {
    this.bulb.turnOn();
  }
}


// Business: "Now also control a Fan and AirConditioner"
class Fan {
  turnOn(): void  { console.log('Fan spinning.'); }
  turnOff(): void { console.log('Fan stopped.'); }
}

// 🚨 Developer forced to create a new Switch for each device
class FanSwitch {                  // duplicate of Switch — only type changed
  constructor(private fan: Fan) {}
  operate(): void { this.fan.turnOn(); }
}
class AirConditionerSwitch { 
//    ...
}  // more duplication — DIP violation compounds


// DIP fix: Introduce an abstraction (interface) for the light source

// The contract — this is the abstraction both sides depend on
interface Switchable {
  turnOn(): void;
  turnOff(): void;
}


// LightBulb implements the contract
class LightBulb implements Switchable {
  turnOn(): void  { console.log('LightBulb is on.'); }
  turnOff(): void { console.log('LightBulb is off.'); }
}

// Fan implements the same contract — Switch doesn't care about the difference
class Fan implements Switchable {
  turnOn(): void  { console.log('Fan is spinning.'); }
  turnOff(): void { console.log('Fan has stopped.'); }
}

// AirConditioner added next sprint — zero changes to Switch
class AirConditioner implements Switchable {
  turnOn(): void  { console.log('AC cooling.'); }
  turnOff(): void { console.log('AC off.'); }
}


// Switch now depends on Switchable — not on any concrete device
class Switch {
  private device: Switchable;  // ✅ abstraction — not a concrete class

  constructor(device: Switchable) {  // ✅ accepts anything that is Switchable
    this.device = device;
  }

  turnOn(): void  { this.device.turnOn(); }
  turnOff(): void { this.device.turnOff(); }
}


// ✅ Same Switch class works for all devices — written once, reused forever
const bulbSwitch = new Switch(new LightBulb());
const fanSwitch  = new Switch(new Fan());
const acSwitch   = new Switch(new AirConditioner());

// ✅ Unit testable with a mock — no real device needed
const mockDevice: Switchable = {
  turnOn:  jest.fn(),
  turnOff: jest.fn(),
};
const testSwitch = new Switch(mockDevice);
testSwitch.turnOn();
expect(mockDevice.turnOn).toHaveBeenCalled();  // ✅ clean isolated test