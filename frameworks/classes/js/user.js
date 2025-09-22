export class User {
    userName = null;
    userEmail = null;
    userAge = null;

    constructor(initialUserName, initialUserEmail, initialUserAge) {
        this.userName = initialUserName;
        this.userEmail = initialUserEmail;
        this.userAge = initialUserAge;
    }

    getDetails() {
        return `Name: ${this.userName}, Email: ${this.userEmail}, Age: ${this.userAge}`;
    }
}