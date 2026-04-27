
class FareCalculator {
    calculateFare(ticket: Ticket, inputFare: number): number {
        const exitTime = new Date();
        const durationInHours = Math.ceil((exitTime.getTime() - ticket.entryTime.getTime()) / (1000 * 60 * 60));
        return durationInHours * inputFare;
    };

    fareStrategy(ticket: Ticket, inputFare: number): number {
        const vehicleSize = ticket.vehicle.size;
        let fareMultiplier = 1;

        switch (vehicleSize) {
            case VehicleSize.SMALL:
                fareMultiplier = 1;
                break;
            case VehicleSize.MEDIUM:
                fareMultiplier = 1.5;
                break;
            case VehicleSize.LARGE:
                fareMultiplier = 2;
                break;
        }

        return this.calculateFare(ticket, inputFare * fareMultiplier);
    };
};


class BaseFareStrategy implements FareCalculatorInterface {

    SMALL_VEHICLE_FARE = 5;
    MEDIUM_VEHICLE_FARE = 7.5;
    LARGE_VEHICLE_FARE = 10;

    calculateFare(ticket: Ticket, inputFare: number): number {
        const vehicleSize = ticket.vehicle.size;
        let fare = 0;

        switch (vehicleSize) {
            case VehicleSize.SMALL:
                fare = this.SMALL_VEHICLE_FARE;
                break;
            case VehicleSize.MEDIUM:
                fare = this.MEDIUM_VEHICLE_FARE;
                break;
            case VehicleSize.LARGE:
                fare = this.LARGE_VEHICLE_FARE;
                break;
        }

        return fare * Math.ceil((new Date().getTime() - ticket.entryTime.getTime()) / (1000 * 60 * 60));
    };
};

class PeakHourFareStrategy implements FareCalculatorInterface {

    PEAK_HOUR_MULTIPLIER = 1.5;

    calculateFare(ticket: Ticket, inputFare: number): number {
        const baseFare = new BaseFareStrategy().calculateFare(ticket, inputFare);
        return baseFare * this.PEAK_HOUR_MULTIPLIER;
    };
};

