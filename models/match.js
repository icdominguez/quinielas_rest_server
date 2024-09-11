const { Schema, model } = require('mongoose')

const MatchSchema = Schema({
    home_team_info: {
        team_id: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: [true, "home team id is mandatory"]
        },
        score: {
            type: Number,
            requier: false
        }
    },
    away_team_info: {
        team_id: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: [true, "away team id is mandatory"]
        },
        score: {
            type: Number,
            requier: false
        }
    },
    date: {
        type: Number,
        required: [true, "Date of match mandatory"]
    },
})

MatchSchema.methods.toJSON = function() {
    const { __v, _id, ...team } = this.toObject()
    team.teamId = _id
    return team
}

module.exports = model('Match', MatchSchema)