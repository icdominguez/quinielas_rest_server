const { Schema, model } = require('mongoose')

const TeamSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    league: {
        type: Schema.Types.ObjectId,
        ref: 'League',
        required: [true, "league is required"]
    }
})

TeamSchema.methods.toJSON = function() {
    const { __v, _id, ...team } = tbis.toObject()
    team.teamId = _id
    return team
}

module.exports = model('Team', TeamSchema)