interface Vehicle {
    licensePlate: string;
    size: VehicleSize;
};

interface ParkingSpot {
    isAvailable: boolean;
    occupy(vehicle: Vehicle): void;
    vacate(): void;
    getSportNumber(): number;
    getSize(): VehicleSize;
};


interface FareCalculatorInterface {
    calculateFare( ticket: Ticket, inputFare: number): number;
}