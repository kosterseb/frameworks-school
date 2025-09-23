import { Animal } from './animal.js';
export class Cat extends Animal {
    
    constructor(name, color) {
        super(name);
        super.age = 3;
        this.color = color;
        this.animal = 'Cat';
    }

    meow() {
        return 'It says Meow! Meow!';
    }

    describe() {
        return `${super.describe()} It has a ${this.color} color.`;
    }
}