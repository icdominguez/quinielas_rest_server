const { response } = require('express')
const Team = require('../models/team')

const { uploadFileCloudinary, removeImageCloudinary } = require('../helpers/cloudinary-actions')

const addTeam = async(req, res = response) => {
    const body = req.body
    const team = new Team(body)

    const cloudinaryFileUrl = await uploadFileCloudinary(req.files.image.tempFilePath)
    team.image = cloudinaryFileUrl

    await team.save()

    res.json({
        team: team
    })
}

const deleteTeam = async(req, res = response) => {
    const { teamId } = req.params
    await Team.findOneAndDelete({ _id: teamId })

    res.json({
        msg: `Team with ${teamId} succesfully deleted from database`
    })
}

const updateTeamImage = async(req, res = response) => {
    const { teamId } = req.params
    
    const teamBbdd = await Team.findById(teamId)
    await removeImageCloudinary(teamBbdd.image)

    const cloudinaryFileUrl = await uploadFileCloudinary(req.files.image.tempFilePath)
    teamBbdd.image = cloudinaryFileUrl

    await Team.findByIdAndUpdate(teamId, { image: cloudinaryFileUrl })

    res.json({
        team: teamBbdd
    })
    
}

module.exports = {
    addTeam,
    deleteTeam,
    updateTeamImage
}