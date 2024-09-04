const { response } = require('express')
const { uploadFileCloudinary } = require('../helpers/cloudinary-actions')
const League = require('../models/league')


const getAllLeagues = async(req, res = response) => {
    const [leagues] = await League.find()

    return res.status(200).json({
        leagues: [leagues]
    })
}

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
    addLeague,
    getAllLeagues
}