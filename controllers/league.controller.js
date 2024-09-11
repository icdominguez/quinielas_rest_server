const { response } = require('express')
const { uploadFileCloudinary } = require('../helpers/cloudinary-actions')
const League = require('../models/league')

const getLeagueById = async(req, res = response) => {
    const { leagueId } = req.params

    try {
        const league = await League.findById(leagueId)
        res.status(200).json({
            league: league
        })

    } catch(error) {
        res.status(500).json({
            msg: `Couldn't connect to the database. Contact the administrator`
        })
    }
}

const getAllLeagues = async(req, res = response) => {
    console.log('getAllLeagues')
    try {
        const [leagues] = await Promise.all([League.find()])
    
        return res.status(200).json({
            leagues: [leagues]
        })
    } catch(error) {
        console.log(`There was an error getting all the leagues available. Error: ${error}`)
        return res.status(500).json({
            msg: `Couldn't connect to the database. Contact the administrator`
        })
    }
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

const deleteLeague = async(req, res = response) => {
    const { leagueId } = req.params

    try {
        const league = await League.findById(leagueId)

        await League.findByIdAndDelete(leagueId)

        return res.status(200).json({
            msg: `League ${league.name} deleted succesfully`
        })
    } catch(error) {
        console.log(`There was an error deleting leegue with id: ${leagueId} \n${error}`)
        return res.status(500).json({
            msg: `Couldn't connect to the database. Contact the administrator`
        })
    }
}

module.exports = {
    getLeagueById,
    getAllLeagues,
    deleteLeague,
    addLeague
}