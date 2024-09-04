const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFileCloudinary = async(file) => {
    console.log(`uploadCloudinary helper, file to upload: ${file}`)
    const { secure_url } = await cloudinary.uploader.upload(file)
    return secure_url
}

module.exports = {
    uploadFileCloudinary
}