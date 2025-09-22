import { Animal } from './animal.js';
import { Cat } from './cat.js';
import { Dog } from './dog.js';

let animal = new Animal(' ', ' ');
let cat = new Cat('Whiskers', 'tabby');
let dog = new Dog('Buddy', 'Golden Retriever');

function showDetails() {
    return `
        <h1 class="title">Animal Details</h1>
            <ul class="animal-list">
                <li>${cat.describe()}</li>
                <li>This animal is ${cat.age} years old.</li>
                <li>${cat.describe()}</li>
                <li>${cat.meow()}</li>
<br>
                <li>${animal.describe()}</li>
                <li>This animal is ${animal.age} years old.</li>
                <li>${dog.describe()}</li>
                <li>${dog.bark()}</li>
            </ul>
    `;
}
document.getElementById('animal').innerHTML = showDetails();

console.log("Cat description:", cat.describe());
console.log("Cat meow:", cat.meow());
console.log("Dog description:", dog.describe());
console.log("Dog bark:", dog.bark());