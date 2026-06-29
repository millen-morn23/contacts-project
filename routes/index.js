const express = require("express");
const router = express.Router();

/* 
    #swagger.tags = ['Home']
    #swagger.description = 'Home route for the Contacts API'
*/

// Home Route
router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("Welcome to the CSE 341 Contacts API");
});

// Contacts Routes
router.use("/contacts", require("./contacts"));

module.exports = router;