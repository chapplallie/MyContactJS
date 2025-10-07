const express = require('express');
const UserController = require('../controllers/user.controller');
const connectedUser = require('../middlewares/auth.middleware');

class UserRoute {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Auth
        this.router.post('/auth', this.userController.auth);
        this.router.post('/signin', this.userController.signin);

        // Contacts
        this.router.get('/contacts', connectedUser, this.userController.getContacts);
        this.router.get('/contacts/:contactId', connectedUser, this.userController.getContactByContactId);
        this.router.post('/contacts/add', connectedUser, this.userController.createContact);
        this.router.patch('/contacts/:contactId', connectedUser, this.userController.updateContact);
        this.router.delete('/contacts/:contactId', connectedUser, this.userController.deleteContact);
    }
}

module.exports = UserRoute;