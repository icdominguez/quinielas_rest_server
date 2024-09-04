const { response } = require("express")

const checkImageFile = (req, res = response, next) => {
    if(!req.files) {
        return res.status(400).json({
            msg: `There's no files to upload`
        })
    } else if (!req.files.image) {
        return res.status(400).json({
            msg: `Param image does not exist, check params`
        })
    }

    const teamSplited = req.files.image.name.split('.')
    const extension = teamSplited[teamSplited.length - 1]

    const validExtensions = ['png', 'jpg', 'jpeg']

    if(!validExtensions.includes(extension)) {
        return res.status(400).json({
            msg: `File extension not supported. Valid extensions: ${validExtensions}`
        })
    }

    next()
}

module.exports = {
    checkImageFile
}