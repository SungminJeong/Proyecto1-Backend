const User = require("../models/user.model");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" }); // 유저 없으면 바로 401
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(req.headers.authorization);
        return res.status(401).json({ error: "No autorizado" });
    }
};

module.exports = isAuth;