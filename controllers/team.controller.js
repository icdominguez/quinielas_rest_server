const { response } = require('express')
const Team = require('../models/team')

const { uploadFileCloudinary, removeImageCloudinary } = require('../helpers/cloudinary-actions')

const getTeamById = async(req, res = response) => {
    const { teamId } = req.params

    const teamBbdd = await Team.findById({ teamId })

    if(!teamBbdd) {
        res.status(400).json({
            msg: `Team with id: ${teamId} not found in database`
        })
    }

    res.status(200).json({
        team: teamBbdd
    })
}

const getTeamsByLeagueId = async(req, res = response) => {
    const { leagueId } = req.params

    console.log(`getTeamsByLeagueId with id: ${leagueId}`)

    const [teams] = await Promise.all(
        [
            Team.find({ league: leagueId })
        ]
    )

    res.json({
        teams: teams
    })
}

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
    getTeamById,
    getTeamsByLeagueId,
    addTeam,
    updateTeamImage,
    deleteTeam
}