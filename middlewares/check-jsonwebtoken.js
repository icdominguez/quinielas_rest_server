const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const checkJWT = ( req = request, res = response, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        console.log(`No token provided`)
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRETORPRIVATEKEY, async(err, userToken) => {
        if(err) {
            return res.sendStatus(403)
        } else {
            const user = await User.findById(userToken.uid)
            req.user = user
            next()
        }
    })
}

module.exports = checkJWT