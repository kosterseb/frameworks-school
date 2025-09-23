import { Animal } from './animal.js';
import { Cat } from './cat.js';
import { Dog } from './dog.js';

// Test: Opret mindst ét objekt af hver klasse (Animal, Dog, Cat)
let animal = new Animal('Generic Animal', 2);
let cat = new Cat('Whiskers', 'orange');
let dog = new Dog('Buddy', 'Golden Retriever');

function showDetails() {
    return `
        <h1 class="title">Animal Assignment Results</h1>
        <ul class="animal-list">
            <li><strong>Cat:</strong> ${cat.describe()}</li>
            <li><strong>Age:</strong> ${cat.age} years old</li>
            <li><strong>Sound:</strong> ${cat.meow()}</li>
            <li><br></li>
            <li><strong>Dog:</strong> ${dog.describe()}</li>
            <li><strong>Age:</strong> ${dog.age} years old</li>
            <li><strong>Sound:</strong> ${dog.bark()}</li>
        </ul>
    `;
}

document.getElementById('animal').innerHTML = showDetails();

// Test: Kald alle metoder og vis output i konsollen    
console.log("animal.describe():", animal.describe());
console.log("animal.name:", animal.name);
console.log("animal.age:", animal.age);

console.log("cat.describe():", cat.describe());
console.log("cat.meow():", cat.meow());
console.log("cat.name:", cat.name);
console.log("cat.age:", cat.age);
console.log("cat.color:", cat.color);

console.log("dog.describe():", dog.describe());
console.log("dog.bark():", dog.bark());
console.log("dog.name:", dog.name);
console.log("dog.age:", dog.age);
console.log("dog.breed:", dog.breed);