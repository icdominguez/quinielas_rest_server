const League = require('../models/league')
const Team = require('../models/team')
const Match = require('../models/match')
const User = require('../models/user')

const teamExists = async(team) => {
    const teamExists = await Team.findOne({ name: team })
    if(teamExists) {
        throw new Error(`Team ${team} already created`)
    }
}

const leagueExists = async(league) => {
    const leagueExists = await League.findOne({ name: league })
    if(leagueExists) {
        throw new Error(`League ${league} already created`)
    }
}

const findLeagueById = async(leagueId) => {
    const leagueExists = await League.findById(leagueId)
    if(!leagueExists){
        throw new Error(`League ${leagueId} does not exists in database`)
    }
}

const findTeamById = async(teamId) => {
    const teamExists = await Team.findById(teamId)
    if(!teamExists) {
        throw new Error(`Team ${teamId} does not exists in database`)
    }
}

const findMatchById = async(match_id) => {
    const matchExists = await Match.findById(match_id)
    if(!matchExists) {
        throw new Error(`Match ${match_id} does not exists in database`)
    }
}

const userExists = async(userId) => {
    const userExists = await User.findById(userId)
    if(!userExists) {
        throw new Error(`User ${match_id} does not exists in database`)
    }
}

module.exports = {
    leagueExists,
    findLeagueById,
    teamExists,
    findTeamById,
    findMatchById,
    userExists
}