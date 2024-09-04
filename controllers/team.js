const { response } = require('express')
const Team = require('../models/team')

const { uploadFileCloudinary } = require('../helpers/cloudinary-actions')

const addTeam = async (req, res = response) => {
    const body = req.body
    const team = new Team(body)

    const cloudinaryFileUrl = await uploadFileCloudinary(req.files.image.tempFilePath)
    team.image = cloudinaryFileUrl

    await team.save()

    res.json({
        team: team
    })
}

module.exports = {
    addTeam
}