const contacts = require("./contacts");
const Contact = require("../models/contact.model");
const mongoose = require("mongoose");

mongoose.connect()//process.env.DB_URL
    .then(async () => {
        const allContacts = await Contact.find();
        if(allContacts.length){
            await Contact.collection.drop();
        }
    })
    .catch((error) => {
        console.log("Error al eliminar los contactos". error.message)
    })
    .then(async() => {
        await Contact.insertMany(contacts);
        console.log("Contactos de prueba insertados")
    })
    .catch((error) => console.log("Error al insertar los contactos", error.message))
    .finally(() => mongoose.disconnect());
    