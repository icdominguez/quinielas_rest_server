const { response } = require('express')

const Match = require('../models/match')
const Team = require('../models/team')

const getMatchById = async(req, res = response) => {
    const { matchId } = req.params

    const matchBbdd = await Match.findById({ _id: matchId })

    if(!matchBbdd) {
        res.status(400).json({
            msg: `Match with id: ${matchId} not found in database`
        })
    }

    const homeTeam = await Team.findById({ _id: matchBbdd.home_team_info.team_id })
    if(!homeTeam) {
        res.status(200).json(200)({
            msg: `Couldn't find team with id ${matchBbdd.home_team_info.team_id}`
        })
    }
    const awayTeam = await Team.findById({ _id: matchBbdd.away_team_info.team_id })
    if(!awayTeam) {
        res.status(200).json(200)({
            msg: `Couldn't find team with id ${matchBbdd.away_team_info.team_id}`
        })
    }

    res.status(200).json({
        match: {
            _id: matchBbdd._id,
            home_team_info: {
                team_id: homeTeam._id,
                name: homeTeam.name,
                league: homeTeam.league,
                image: homeTeam.image,
                score: matchBbdd.home_team_info.score
            },
            away_team_info: {
                team_id: awayTeam._id,
                name: awayTeam.name,
                league: awayTeam.league,
                image: awayTeam.image,
                score: matchBbdd.away_team_info.score
            },
            date: matchBbdd.date
        }
    })
}

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
    const homeTeam = await Team.findById(body.home_team_info.team_id)
    const awayTeam = await Team.findById(body.away_team_info.team_id)

    if(!homeTeam.league.equals(awayTeam.league)) {
        return res.status(400).json({
            msg: "Couldn't create match, teams not belong to the same league"
        })
    }

    // Check there's no same match created
    const matchExist = await Match.findOne({$and:[
            {"home_team_info.team_id": body.home_team_info.team_id}, 
            {"away_team_info.team_id": body.away_team_info.team_id}
        ]}
    )

    if(matchExist) {
        console.log(`Match exists ${JSON.stringify(matchExist)}`)
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
    getMatchById,
    addMatch,
    deleteMatch
}