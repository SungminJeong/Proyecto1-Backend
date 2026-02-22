const express = require("express");
const isAuth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");

const { registerUser,loginUser, changeRole, deleteUser, getAllUser, updatePhoto } = require("../controllers/user.controllers");
const upload = require("../middleware/file.middleware");

const userRouter = express.Router();

userRouter.get("", getAllUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put('/:id/role', isAuth, isAdmin, changeRole);
userRouter.delete('/:id',isAuth, deleteUser)
userRouter.put("/:id", isAuth, upload.single("photo"),updatePhoto)

module.exports = userRouter;