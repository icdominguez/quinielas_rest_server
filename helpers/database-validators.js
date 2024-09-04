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

module.exports = {
    teamExists,
    leagueExists
}