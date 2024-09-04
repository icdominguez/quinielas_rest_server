const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFileCloudinary = async(file) => {
    console.log(`uploadCloudinary helper, file to upload: ${file}`)
    const { secure_url } = await cloudinary.uploader.upload(file)
    return secure_url
}

const removeImageCloudinary = async(imageUrl) => {
    const nameArray = imageUrl.split('/')
    const name = nameArray[nameArray.length - 1]
    const [public_id] = name.split('.')
    cloudinary.uploader.destroy(public_id)
}

module.exports = {
    uploadFileCloudinary,
    removeImageCloudinary
}