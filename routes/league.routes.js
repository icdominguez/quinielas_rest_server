const { Router } = require('express')
const { check } = require('express-validator')
const { checkFields } = require('../middlewares/check-fields')
const { leagueExists, findLeagueById } = require('../helpers/database-validators')
const { addLeague, getAllLeagues, getLeagueById, deleteLeague } = require('../controllers/league.controller')
const { checkImageFile } = require('../middlewares/check-image-file')

const router = Router()

router.get('/', getAllLeagues)

router.get('/:leagueId', [
    check('leagueId', 'League id not found in request').not().isEmpty(),
    check('leagueId', 'Provided league id is not a valid mongo id').isMongoId(),
    check('leagueId', ).custom(findLeagueById),
    checkFields
], getLeagueById)

router.post('/add', [
    checkImageFile,
    check('name', 'League name is mandatory').not().isEmpty(),
    check('name').custom(leagueExists),
    checkFields,
], addLeague)

router.delete('/:leagueId', [
    check('leagueId', 'League id not found in request').not().isEmpty(),
    check('leagueId', 'Provided league id is not a valid mongo id').isMongoId(),
    check('leagueId', ).custom(findLeagueById),
    checkFields
], deleteLeague)

module.exports = router