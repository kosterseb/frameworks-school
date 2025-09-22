export class Animal {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        return `This animal is a ${this.name}, ${this.age}.`;
    }
}