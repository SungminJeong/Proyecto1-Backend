const Contact = require("../models/contact.model");

const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find().populate("user", "photo userId");
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "No se encuentra los contactos"})
    }
};

const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({ error: "No se encuentran el contacto" });
        }
        const contact = await Contact.findById(id);
        return res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: "Error"})
    }
}

const createContacts = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({error: "Error al crear un nuevo contacto"})
    }
};

const updateContacts = async(req, res) => {
    try {
        const { id } = req.params;
        const prev = await Contact.findById(id);
        if(!prev){
            return res.status(404).json({ error: "Contacto no encontrado por ID" })
        }

        const updates = {...req.body};

        const updated = await Contact.findByIdAndUpdate(id, updates, {
            new: true,

        });

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(400).json({
            error: "Error al actualizar el contacto",
            detalles: err.message,
        });
    }
};

const deleteContact  = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteContact = await Contact.findByIdAndDelete(id);
        if(!deleteContact){
            return res.status(404).json({ error: "Contacto no encontrado por ID" });
        }
        res.status(200).json({info: "Contacto eliminado correctamente"});
        //deleteImg also
    } catch (error) {
        res.status(500).json({error: "Error al eliminar el contacto"})
    }
}


module.exports = { 
    getAllContact, 
    getContactById,
    createContacts,
    updateContacts,
    deleteContact
};