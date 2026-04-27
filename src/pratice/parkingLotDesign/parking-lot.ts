/**
 * 
 *  Before diving into the design, it’s important to enumerate the core objects.

    Vehicle: This object represents a vehicle that needs a spot. It encapsulates details like the license plate and size (small for motorcycles, medium for cars, large for trucks), serving as the foundation for spot assignment and fee calculation.
    ParkingSpot: This object models an individual parking spot in the parking lot. It’s the physical space where a Vehicle parks, ensuring only appropriately sized vehicles can park based on its capacity.
    Ticket: This object represents a parking ticket issued when a Vehicle enters the parking lot. It stores critical details, including the ticket ID, the associated Vehicle, the assigned ParkingSpot, and entry time, which are later used to calculate fees and free up spots upon exit.
    ParkingManager: This object oversees the parking lot’s spot allocation, managing the assignment, lookup, and release of ParkingSpot instances. It ensures a Vehicle gets the right spot by checking availability based on size, and updates the system when vehicles leave, keeping parking operations smooth and efficient.
    ParkingLot: This acts as a facade, providing a central interface to manage the system’s key functionalities: vehicle entry, spot assignment, ticketing, and fee calculation. It keeps its logic lightweight by delegating tasks such as spot allocation to the ParkingManager, fee computation to a FareCalculator class, and coordinating the flow of vehicles in and out without handling the details.
 */


