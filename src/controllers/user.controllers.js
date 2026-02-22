const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utils/token");
const deleteImgCloudinary = require("../utils/cloudinary.util");

const getAllUser = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "No se encuentran los usuarios"})
    }
}

const registerUser = async(req, res, next) => {
    try {
        const newUser = new User(req.body);
        if(req.file){
            newUser.photo = req.file.path;
            newUser.photoId =req.file.filename
        }

        const createdUser = await newUser.save();

        return res.status(201).json(createdUser);

    } catch (error) {
        return res.status(500).json({ error: "Error al registrar al usuario" });
    }
};

const loginUser = async(req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({userId: userId});
        if(!user){
            return res.status(404).json({ error: "No se encontró el usuario"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json( { message: "La contraseña es incorrecta"})
        };

        const token = generateToken(user._id, user.role);
        console.log(user._id)
        return res.status(200).json({ token: token });
    } catch (error) {
        return res.status(400).json({ error: "Error al iniciar sesión" });
    }
};

const changeRole = async(req, res) => {
    try {
        const { id } = req.params;
        const prev = await User.findById(id);
        if(!prev){
            return res.status(404).json({ error: "Usuario no encontrado por ID" })
        }

        const changesRole = {...req.body};
        const changedRole = await User.findByIdAndUpdate(id, changesRole, {
            new: true
        });
        return res.status(200).json(changedRole)

    } catch (error) {
        return res.status(400).json({
            error: "Error al actualizar el rol",
            detalles: err.message,
        });
    }
};

const updatePhoto = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(req.user, req.user._id.toString())
        if (req.user.role !== "admin" && req.user._id.toString() !== id) {
            return res.status(403).json({ error: "Acceso denegado" });
        }
        const prev = await User.findById(id);
        if(!prev){
                return res.status(404).json({ error: "Usuario no encontrado por ID" })
        }

        const changePhoto = {...req.body};
        let newPhotoId = null;

        if(req.file){
            changePhoto.photo = req.file.path;
            changePhoto.photoId = req.file.filename;
            newPhotoId = req.file.filename;
        };

        const changedPhoto = await User.findByIdAndUpdate(id, changePhoto, {
            new: true,
            runValidators: true,
        });

        if(newPhotoId && prev.photoId){
            await deleteImgCloudinary(prev.photoId)
        };

        return res.status(200).json(changedPhoto);

    } catch (error) {
        if (req.file?.filename) await deleteImgCloudinary(req.file.filename);
        return res.status(400).json({
            error: "Error al cambiar la foto",
            detalles: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        //if (!req.user) return res.status(401).json({ error: "No auth!" });
        const userId = req.params.id;
        if (req.user.role === 'admin'){
            await User.findByIdAndDelete(userId);
            return res.json({ message: "Eliminado correctamente" });
        }
        if (req.user.id === userId) {
            await User.findByIdAndDelete(userId);
            return res.json({ message: "Tu cuenta ha sido eliminada" });
        }
        return res.status(403).json({ error: "No autorizado"});
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar al usuario", info: error.message})
    }
}

module.exports =  { registerUser, loginUser, changeRole, deleteUser,getAllUser, updatePhoto };