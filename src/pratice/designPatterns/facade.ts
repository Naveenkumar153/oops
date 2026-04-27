/**
 *  Facade design pattern
 
    The Facade pattern is a structural design pattern that provides a simple interface to a complex subsystem, such as a library, framework, or set of classes. It simplifies how clients interact with the system by hiding its underlying complexity.

    In the parking lot design, the Facade pattern is used in the ParkingLot class, which streamlines client interactions by managing tasks like vehicle entry, spot assignment, and fee calculation, delegating to subsystems such as ParkingManager and FareCalculator.

    To illustrate the Facade pattern in another domain, the following example uses a home theater system.

    Problem

    Imagine you’re setting up a home theater system with multiple components, such as a DVD player, projector, sound system, and lights. To watch a movie, you must turn on each component, adjust settings, and synchronize them. This process is complex, requiring users to understand each component’s working. As the system grows, adding new devices (e.g., a streaming device) increases complexity, making it harder to use the system efficiently.

    Solution

    The Facade pattern addresses this by introducing a single interface, the facade, that encapsulates the subsystem’s complexity. For the home theater, a HomeTheaterFacade class could provide methods like watchMovie(), which internally manages all components (e.g., turning on the projector, setting the sound system). Clients interact only with the facade, which delegates tasks to the subsystem, simplifying usage.


    When to use

    The Facade design pattern is particularly useful in scenarios:

    When a subsystem is complex, with multiple components or interactions, and you want to provide a simpler interface for clients.
    
    When you want to layer a system into subsystems, but still offer a unified entry point for common operations.

 */


interface DVDPlayer {
    play(movie: string): void;
    stop(): void;
};

interface Projector {
    turnOn(): void;
    turnOff(): void;
};

interface SoundSystem {
    setVolume(level: number): void;
    turnOn(): void;
    turnOff(): void;
};

interface Lights {
    dim(level: number): void;
    turnOn(): void;
    turnOff(): void;
};

class HomeTheaterFacade {
    private dvdPlayer: DVDPlayer;
    private projector: Projector;
    private soundSystem: SoundSystem;
    private lights: Lights;

    constructor(dvdPlayer: DVDPlayer, projector: Projector, soundSystem: SoundSystem, lights: Lights) {
        this.dvdPlayer = dvdPlayer;
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.lights = lights;
    }

    watchMovie(movie: string): void {
        console.log("Get ready to watch a movie...");
        this.lights.dim(50);
        this.projector.turnOn();
        this.soundSystem.turnOn();
        this.soundSystem.setVolume(5);
        this.dvdPlayer.play(movie);
    }

    endMovie(): void {
        console.log("Shutting down the home theater...");
        this.dvdPlayer.stop();
        this.projector.turnOff();
        this.soundSystem.turnOff();
        this.lights.turnOn();
    }
};

// Example usage
const dvdPlayer: DVDPlayer = {
    play: (movie: string) => console.log(`Playing movie: ${movie}`),
    stop: () => console.log("Stopping DVD player")
};

const projector: Projector = {
    turnOn: () => console.log("Turning on projector"),
    turnOff: () => console.log("Turning off projector")
};

const soundSystem: SoundSystem = {
    setVolume: (level: number) => console.log(`Setting volume to ${level}`),
    turnOn: () => console.log("Turning on sound system"),
    turnOff: () => console.log("Turning off sound system")
};

const lights: Lights = {
    dim: (level: number) => console.log(`Dimming lights to ${level}%`),
    turnOn: () => console.log("Turning on lights"),
    turnOff: () => console.log("Turning off lights")
};

const homeTheater = new HomeTheaterFacade(dvdPlayer, projector, soundSystem, lights);
homeTheater.watchMovie("Inception");
homeTheater.endMovie();