const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    },
    photo: {
        type: String, 
        required: true, 
        default:"https://res.cloudinary.com/dwhvwobib/image/upload/v1771493529/istockphoto-2171382633-612x612_i6amxt.jpg"
    },
    photoId: { type: String, trim:true }
},{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;