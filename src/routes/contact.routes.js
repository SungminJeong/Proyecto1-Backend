const express = require("express");

const {
    getAllContact, 
    getContactById, 
    createContacts, 
    updateContacts, 
    deleteContact
    } = require("../controllers/contact.controllers");

const contactRouter = express.Router();

contactRouter.get("/", getAllContact);
contactRouter.get("/:id", getContactById);
contactRouter.post("/create", createContacts);
contactRouter.put("/:id", updateContacts);
contactRouter.delete("/:id", deleteContact);


module.exports = contactRouter;