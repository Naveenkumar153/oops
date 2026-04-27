

class Ticket {
    private static idCounter = 0;
    public readonly ticketId: number;
    public readonly vehicle: Vehicle;
    public readonly parkingSpot: ParkingSpot;
    public readonly entryTime: Date;
    public exitTime: Date | null;

    constructor(vehicle: Vehicle, parkingSpot: ParkingSpot) {
        this.ticketId = Ticket.idCounter++;
        this.vehicle = vehicle;
        this.parkingSpot = parkingSpot;
        this.entryTime = new Date();
        this.exitTime = null;
    };

    calculateParkingDuration(): number {
        if (!this.exitTime) {
            throw new Error('Vehicle has not exited yet');
        }
        return (this.exitTime.getTime() - this.entryTime.getTime()) / 1000; // duration in seconds
    }

    markExit(): void {
        this.exitTime = new Date();
    };
};