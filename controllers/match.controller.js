const { response } = require('express')

const Match = require('../models/match')
const team = require('../models/team')

const addMatch = async(req, res = response) => {
    const body = req.body
    console.log(`${JSON.stringify(body)}`)

    // Check teams are not the same
    if(body.home_team_info.team_id === body.away_team_info.team_id) {
        return res.status(400).json({
            msg: "Couldn't create match; teams provided are the same"
        })
    }

    // Check teams are not from different leagues
    const homeTeam = await team.findById(body.home_team_info.team_id)
    const awayTeam = await team.findById(body.away_team_info.team_id)

    if(!homeTeam.league.equals(awayTeam.league)) {
        return res.status(400).json({
            msg: "Couldn't create match, teams not belong to the same league"
        })
    }

    // Check there's no same match created
    const matchExist = await team.find({$and:[
            {"home_team_info.team_id": body.home_team_info.team_id}, 
            {"away_team_info.team_id": body.away_team_info.team_id}
        ]}
    )

    if(matchExist) {
        console.log(`Match exists`)
        return res.status(400).json({
            msg: "Match already created"
        })
    }

    const match = new Match(body)
    await match.save()

    return res.status(200).json({
        match: match
    })
}

const deleteMatch = async(req, res = response) => {
    console.log('delete match endpoint')
    const { matchId } = req.params
    await Match.findOneAndDelete({ _id: matchId })

    res.status(200).json({
        msg: "Match succesfully deleted from database"
    })
}

module.exports = {
    addMatch,
    deleteMatch
}