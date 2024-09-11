const { response } = require("express");

const checkRole = (req, res = response, next) => {
    if(!req.user) {
        return res.status(500).json({
            msg: `checking role before checkin g the JWT`
        })
    }

    const { name, role } = req.user

    if(role != 'ADMIN') {
        res.status(401).json({
            msg: `User ${name} is not an administrator, cannot do it`
        })
    }

    next()
}

module.exports = {
    checkRole
}