import { Animal } from './animal.js';

export class Dog extends Animal {

    constructor(name, breed) {
        super(name);
        super.age = 5;
        this.breed = breed;
        this.animal = 'Dog';
    }

    bark() {
        return 'It says Woof! Woof!';
    }

    describe() {
        return `${super.describe()} It is a ${this.breed} breed.`;
    }
}
