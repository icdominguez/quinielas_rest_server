const { response } = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")
const { generateJsonWebToken } = require("../helpers/generate-jsonwebtoken")

const login = async(req, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        // Check if email exists
        if(!user) {
            return res.status(400).json({
                msg: "User or password incorrect"
            })
        }        
        // Check if user is active
        if(!user.active) {
            return res.status(400).json({
                msg: "User is disabled"
            })
        }
        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: "User or password incorrect"
            })
        }
        // Generate JWT
        const token = await generateJsonWebToken(user._id)

        return res.status(200).json({
            user: user,
            token: token
        })
    } catch(error) {
        return res.status(500).json({
            msg: `Internal server error ${error}`
        })
    }
}

module.exports = {
    login
}