const { response } = require('express')
const { uploadFileCloudinary } = require('../helpers/cloudinary-actions')
const League = require('../models/league')

const addLeague = async (req, res = response) => {
    const body = req.body
    const league = new League(body)

    const cloudinaryFileUrl = await uploadFileCloudinary(req.files.image.tempFilePath)
    league.image = cloudinaryFileUrl

    await league.save()

    res.json({
        league: league
    })
}

module.exports = {
    addLeague
}