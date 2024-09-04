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
        type: String,
        required: [true, "league is required"],
        enum: ['LaLiga', 'LaLiga2']
    }
})

module.exports = model('Team', TeamSchema)