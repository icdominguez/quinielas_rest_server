const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { checkFields } = require("../middlewares/check-fields");

const router = Router()

router.post('/login', [
    check('email', 'email is mandatory').not().isEmpty(),
    check('email', 'provided email is not a valid one').isEmail(),
    check('password', 'password should not be null').not().isEmpty(),
    checkFields
], login)

module.exports = router