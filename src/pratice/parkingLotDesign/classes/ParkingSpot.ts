
// ParkingSpot implementations

class CompactSpot implements ParkingSpot {
    private spotNumber: number;
    private occupiedBy: Vehicle | null;

    constructor(spotNumber: number) {
        this.spotNumber = spotNumber;
        this.occupiedBy = null;
    }

    get isAvailable(): boolean {
        return this.occupiedBy === null;
    }

    occupy(vehicle: Vehicle): void {
        if (this.isAvailable && vehicle.size === VehicleSize.SMALL) {
            this.occupiedBy = vehicle;
        } else {
            throw new Error('Spot not available or vehicle size mismatch');
        }
    }

    vacate(): void {
        this.occupiedBy = null;
    }

    getSportNumber(): number {
        return this.spotNumber;
    }

    getSize(): VehicleSize {
        return VehicleSize.SMALL;
    }
};

// RegularSpot implementation

class RegularSpot implements ParkingSpot {
    private spotNumber: number;
    private occupiedBy: Vehicle | null;

    constructor(spotNumber: number) {
        this.spotNumber = spotNumber;
        this.occupiedBy = null;
    }

    get isAvailable(): boolean {
        return this.occupiedBy === null;
    }

    occupy(vehicle: Vehicle): void {
        if (this.isAvailable && vehicle.size !== VehicleSize.LARGE) {
            this.occupiedBy = vehicle;
        } else {
            throw new Error('Spot not available or vehicle size mismatch');
        }
    }

    vacate(): void {
        this.occupiedBy = null;
    }

    getSportNumber(): number {
        return this.spotNumber;
    }

    getSize(): VehicleSize {
        return VehicleSize.MEDIUM;
    }
};


class OversizeSpot implements ParkingSpot {
    private spotNumber: number;
    private occupiedBy: Vehicle | null;

    constructor(spotNumber: number) {
        this.spotNumber = spotNumber;
        this.occupiedBy = null;
    }

    get isAvailable(): boolean {
        return this.occupiedBy === null;
    }

    occupy(vehicle: Vehicle): void {
        if (this.isAvailable) {
            this.occupiedBy = vehicle;
        } else {
            throw new Error('Spot not available');
        }
    }

    vacate(): void {
        this.occupiedBy = null;
    }

    getSportNumber(): number {
        return this.spotNumber;
    }

    getSize(): VehicleSize {
        return VehicleSize.LARGE;
    }
};
