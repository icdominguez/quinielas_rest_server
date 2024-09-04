const League = require('../models/league')
const Team = require('../models/team')

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

module.exports = {
    teamExists,
    leagueExists,
    findLeagueById,
    findTeamById
}