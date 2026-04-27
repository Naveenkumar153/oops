
// ParkingManager

class ParkingManager {
    private compactSpots: CompactSpot[];
    private regularSpots: RegularSpot[];
    private oversizeSpots: OversizeSpot[];
    

    constructor(compactCount: number, regularCount: number, oversizeCount: number) {
        this.compactSpots = Array.from({ length: compactCount }, (_, i) => new CompactSpot(i + 1));
        this.regularSpots = Array.from({ length: regularCount }, (_, i) => new RegularSpot(i + 1 + compactCount));
        this.oversizeSpots = Array.from({ length: oversizeCount }, (_, i) => new OversizeSpot(i + 1 + compactCount + regularCount));
    }

    findSpotForVehicle(vehicle: Vehicle): ParkingSpot | null {
        if (vehicle.size === VehicleSize.SMALL) {
            return this.compactSpots.find(spot => spot.isAvailable) || null;
        } else if (vehicle.size === VehicleSize.MEDIUM) {
            return this.regularSpots.find(spot => spot.isAvailable) || null;
        } else {
            return this.oversizeSpots.find(spot => spot.isAvailable) || null;   
        }
    };

    parkVehicle(vehicle: Vehicle): ParkingSpot | null {
        const spot = this.findSpotForVehicle(vehicle);
        if (spot) {
            spot.occupy(vehicle);
            return spot;
        }
        return null;
    };

    unparkVehicle(spotNumber: number): void {
        const spot = [...this.compactSpots, ...this.regularSpots].find(s => s.getSportNumber() === spotNumber);
        if (spot) {
            spot.vacate();
        } else {
            throw new Error('Invalid spot number');
        }
    };
}

