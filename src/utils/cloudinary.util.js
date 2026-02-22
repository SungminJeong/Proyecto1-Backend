const cloudinary = require("cloudinary").v2;

const deleteImgCloudinary = async (publicId) => {
    if(!publicId){
        return 
    };
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("No se pudo eliminary la imagen");
    }
};

module.exports = deleteImgCloudinary;