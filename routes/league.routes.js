const { Router } = require('express')
const { check } = require('express-validator')
const { checkFields } = require('../middlewares/check-fields')
const { leagueExists } = require('../helpers/database-validators')
const { addLeague, getAllLeagues } = require('../controllers/league.controller')
const { checkImageFile } = require('../middlewares/check-image-file')

const router = Router()

router.get('/', getAllLeagues)

router.post('/add', [
    checkImageFile,
    check('name', 'League name is mandatory').not().isEmpty(),
    check('name').custom(leagueExists),
    checkFields,
], addLeague)

module.exports = router