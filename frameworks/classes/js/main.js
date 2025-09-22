import { User } from './user.js';
import { Admin } from './admin.js';

let userOne = new User('Martin', 'lala@hello.com', 66);
let userTwo = new User('Sophie', 'yoyo@goodbye.org', 47);
let userThree = new User('Kevin', 'kevbae@jubi.com', 29);
let userFive = new Admin('Clara', 'claradmin@jubi.com', 67, 'superadmin');

userOne.getDetails();
userTwo.getDetails();
userThree.getDetails();

function showDetails() {
    return `
        <h1>User Details</h1>
        <p>${userOne.getDetails()}</p>
        <p>${userTwo.getDetails()}</p>
        <p>${userThree.getDetails()}</p>
        <p>${userFive.getAdminDetails()}</p>
    `;
}
document.getElementById('app').innerHTML = showDetails();

console.log(userOne, userTwo, userThree);