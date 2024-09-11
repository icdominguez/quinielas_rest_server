const { Router } = require("express")
const { addUser, deleteUser } = require("../controllers/user.controller")
const { checkFields } = require("../middlewares/check-fields")
const { check } = require("express-validator")
const checkJWT = require("../middlewares/check-jsonwebtoken")
const { checkRole } = require("../middlewares/check-role")
const { userExists } = require("../helpers/database-validators")

const router = Router()

router.post('/', [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('email', 'Email provided is not valid').isEmail(),
    check('password').not().isEmpty(),
    checkFields
], addUser)

router.delete('/:userId', [
    checkJWT,
    checkRole,
    check('userId', 'User id not provided').not().isEmpty(),
    check('userId', 'User id provided is not a valid one').not().isEmpty(),
    check('userId').custom(userExists),
    checkFields
], deleteUser)

module.exports = router