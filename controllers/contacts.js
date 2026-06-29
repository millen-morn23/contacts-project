const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const result = await db.collection("contacts").find();
        const contacts = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving contacts."
        });
    }
};

// GET single contact
const getSingle = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const contactId = new ObjectId(req.params.id);

        const contact = await db.collection("contacts").findOne({
            _id: contactId
        });

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving contact."
        });
    }
};

// POST create new contact
const createContact = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        if (
            !contact.firstName ||
            !contact.lastName ||
            !contact.email ||
            !contact.favoriteColor ||
            !contact.birthday
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const result = await db.collection("contacts").insertOne(contact);

        res.status(201).json({
            id: result.insertedId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating contact."
        });
    }
};

// PUT update contact
const updateContact = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const contactId = new ObjectId(req.params.id);

        const updatedContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        if (
            !updatedContact.firstName ||
            !updatedContact.lastName ||
            !updatedContact.email ||
            !updatedContact.favoriteColor ||
            !updatedContact.birthday
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const result = await db.collection("contacts").replaceOne(
            { _id: contactId },
            updatedContact
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating contact."
        });
    }
};

// DELETE contact
const deleteContact = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const contactId = new ObjectId(req.params.id);

        const result = await db.collection("contacts").deleteOne({
            _id: contactId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Contact not found."
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting contact."
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};