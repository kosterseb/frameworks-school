import { User } from './user.js';
import { Admin } from './admin.js';

let userOne = new User('Martin', 'lala@hello.com', 66);
let userTwo = new User('Sophie', 'yoyo@goodbye.org', 47);
let userThree = new User('Kevin', 'kevbae@jubi.com', 29);
let userFive = new Admin('Clara', 'claradmin@jubi.com', 67);

function showDetails() {
    return `
        <h1 class="title">User Details</h1>
            <ul class="user-list">
                <li>${userOne.getDetails()}</li>
                <li>${userOne.isAdmin()}</li>

                <li>${userTwo.getDetails()}</li>
                <li>${userTwo.isAdmin()}</li>

                <li>${userThree.getDetails()}</li>
                <li>${userThree.isAdmin()}</li>

                <li>${userFive.getAdminDetails()}</li>
                <li>${userFive.isAdmin()}</li>
            </ul>
    `;
}
document.getElementById('app').innerHTML = showDetails();

console.log(userOne, userTwo, userThree, userFive);