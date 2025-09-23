import { User } from './user.js';

export class Admin extends User {
    userRole = 'admin';

    constructor(initialUserName, initialUserEmail, initialUserAge) {
        super(initialUserName, initialUserEmail, initialUserAge);
    }

    getAdminDetails() {
        return this.getDetails();
    }
}