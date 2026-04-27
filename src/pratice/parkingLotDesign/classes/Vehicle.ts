
// Vehicle implementations

class Car implements Vehicle {
    licensePlate: string;
    size: VehicleSize;

    constructor(licensePlate: string) {
        this.licensePlate = licensePlate;
        this.size = VehicleSize.MEDIUM;
    }
};

class Motorcycle implements Vehicle {
    licensePlate: string;
    size: VehicleSize;

    constructor(licensePlate: string) {
        this.licensePlate = licensePlate;
        this.size = VehicleSize.SMALL;
    }
};

class Truck implements Vehicle {
    licensePlate: string;
    size: VehicleSize;

    constructor(licensePlate:string) {
        this.licensePlate = licensePlate;
        this.size = VehicleSize.LARGE;
    };
};