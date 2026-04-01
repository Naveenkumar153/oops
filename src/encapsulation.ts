// See ENCAPSULATION.md for documentation

type PersonOccupation = "Engineer" | "Doctor" | "Artist" | "Teacher" | "Other";

export class Person {
    private name: string;
    private age: number;
    private isMarried: boolean;
    private occupation: PersonOccupation;

    constructor(name: string, age: number, isMarried: boolean = false, occupation: PersonOccupation = "Other") {
        this.name = name;
        this.age = age;
        this.isMarried = isMarried;
        this.occupation = occupation;
    }

    get getName(): string {
        return this.name;
    };

    set setName(name: string) {
        this.name = name;
    }

    get getAge(): number {
        return this.age;
    };

    set setAge(age: number) {
        if (age < 0) {
            throw new Error("Age cannot be negative");
        }
        this.age = age;
    };

    get getIsMarried(): boolean {
        return this.isMarried;
    };
    
    set setIsMarried(isMarried: boolean) {
        this.isMarried = isMarried;
    };

    get getOccupation(): PersonOccupation {
        return this.occupation;
    };

    set setOccupation(occupation: PersonOccupation) {
        this.occupation = occupation;
    }
}
