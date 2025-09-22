import { User } from './user.js';

export class Admin extends User {
    userRole = 'admin';

    constructor(initialUserName, initialUserEmail, initialUserAge) {
        super(initialUserName, initialUserEmail, initialUserAge);
        this.adminRole = 'admin';
    }

    getAdminDetails() {
        return this.getDetails();
    }
}