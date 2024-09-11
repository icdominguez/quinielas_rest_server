const { Schema, model } = require('mongoose')

const LeagueSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    }
})

LeagueSchema.methods.toJSON = function() {
    const { __v, _id, ...league } = this.toObject()
    league.leagueId = _id
    return league
}

module.exports = model('League', LeagueSchema)