const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const addUser = async(req, res = response) => {
    const { name, email, password, role } = req.body
    
    const userExists = await User.findOne({ email })
    if(userExists) {
        return res.status(400).json({
            msg: 'That email already exists'
        })
    }

    const user = new User({name, email, password, role})

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.status(200).json({
        user: user
    })
}

const deleteUser = async(req, res = response) => {
    const { userId } = req.params

    await User.findByIdAndUpdate(userId, { active: false })

    res.status(200).json({
        msg: 'User updated'
    })

}

module.exports = {
    addUser,
    deleteUser
}