require("dotenv").config();
const express = require("express");

const connectDB = require("./src/configs/db");
const cloudinary = require("cloudinary").v2;
const contactRouter = require("./src/routes/contact.routes");
const userRouter = require("./src/routes/user.routes");

const app = express();
app.use(express.json());

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
});

//Ruta
app.use("/contacts", contactRouter);
app.use("/users", userRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" })
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is runyning in http://localhost:${PORT} ✅`);
})