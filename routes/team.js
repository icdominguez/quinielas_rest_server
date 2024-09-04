const { Router } = require('express')
const { check } = require('express-validator')
const { addTeam } = require('../controllers/team')
const { checkFields } = require('../middlewares/check-fields')
const { teamExists } = require('../helpers/database-validators')
const { isValidImage } = require('../middlewares/valid-image-file')

const router = Router()

router.post('/add', [
    isValidImage,
    check('name', 'Team name is mandatory').not().isEmpty(),
    check('name').custom(teamExists),
    check('league', 'Team league is mandatory').not().isEmpty(),
    check('league', 'Team league not supported').isIn('LaLiga', 'LaLiga2'),
    checkFields,
], addTeam)

module.exports = router