

class ParkingLot {
    private parkingManager: ParkingManager;
    private fareCalculator: FareCalculator;

    constructor(parkingManager: ParkingManager, fareCalculator: FareCalculator) {
        this.parkingManager = parkingManager;
        this.fareCalculator = fareCalculator;
    }

    public enterVehicle(vehicle: Vehicle): Ticket {
        const parkingSpot = this.parkingManager.assignSpot(vehicle);
        if (!parkingSpot) {
            throw new Error('No available parking spot for this vehicle size');
        }
        const ticket = new Ticket(vehicle, parkingSpot);
        return ticket;
    };

    public leaveVehicle(ticket: Ticket): number {
        ticket.markExit();
        this.parkingManager.releaseSpot(ticket.parkingSpot);
        const fare = this.fareCalculator.fareStrategy(ticket, 5); // Assuming base fare is 5
        return fare;
    };

}