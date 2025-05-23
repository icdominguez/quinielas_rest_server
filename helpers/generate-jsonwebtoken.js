const jwt = require("jsonwebtoken")

const generateJsonWebToken = (uid = '') => {
    console.log(`generateJsonWebToken ${uid}`)

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log(err)
                reject(`Couldn't generate json web token`)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJsonWebToken
}