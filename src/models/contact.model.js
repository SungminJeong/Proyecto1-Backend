const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    phone: {type: String, trim: true},
    user: { type: mongoose.Types.ObjectId, ref: "User" }
},{
    timestamps: true,
    versionKey: false
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;