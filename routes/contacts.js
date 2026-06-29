const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Retrieve all contacts'
*/
router.get("/", contactsController.getAll);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Retrieve a single contact by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB Contact ID',
        required: true,
        type: 'string'
    }
*/
router.get("/:id", contactsController.getSingle);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Create a new contact'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    favoriteColor: "Blue",
                    birthday: "2000-01-01"
                }
            }
        }
    }
*/
router.post("/", contactsController.createContact);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Update an existing contact'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB Contact ID',
        required: true,
        type: 'string'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    favoriteColor: "Green",
                    birthday: "2000-01-01"
                }
            }
        }
    }
*/
router.put("/:id", contactsController.updateContact);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Delete a contact'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB Contact ID',
        required: true,
        type: 'string'
    }
*/
router.delete("/:id", contactsController.deleteContact);

module.exports = router;