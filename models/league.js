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

module.exports = model('League', LeagueSchema)