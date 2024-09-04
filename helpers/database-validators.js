const Team = require('../models/team')

const teamExists = async(team) => {
    const teamExists = await Team.findOne({ name: team })
    if(teamExists) {
        throw new Error(`Team ${team} already created`)
    }
}

module.exports = {
    teamExists
}