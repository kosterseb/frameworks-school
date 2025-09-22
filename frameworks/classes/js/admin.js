import { User } from './user.js';

export class Admin extends User {
    adminRole = null;

    constructor(initialUserName, initialUserEmail, initialUserAge, initialAdminRole) {
        super(initialUserName, initialUserEmail, initialUserAge);
        this.adminRole = initialAdminRole;
    }

    getAdminDetails() {
        return `${this.getDetails()}, Role: ${this.adminRole}`;
    }
}