const { Router } = require('express')
const { check } = require('express-validator')
const { addMatch, deleteMatch, getMatchById } = require('../controllers/match.controller')
const { checkFields } = require('../middlewares/check-fields')
const { teamExists, findMatchById } = require('../helpers/database-validators')

const router = Router()

router.get('/:matchId', [
    check('matchId', 'Id provided is not a valid mongo id').isMongoId(),
    checkFields
], getMatchById)

router.post('/', [
    check('home_team_info.team_id', 'No home team id provided').notEmpty(),
    check('home_team_info.team_id', 'Invalid id provided for home team').isMongoId(),
    check('home_team_info.team_id', 'Home team does not exists').custom(teamExists),
    check('away_team_info.team_id', 'No away team id provided').notEmpty(),
    check('away_team_info.team_id', 'Invalid id provided for away team').isMongoId(),
    check('away_team_info.team_id', 'Home team does not exists').custom(teamExists),
    checkFields
], addMatch)

router.delete('/:matchId', [
    check('matchId', 'Id provided is not a valid mongo id').isMongoId(),
    check('matchId', 'match does not exists in database').custom(findMatchById),
    checkFields
], deleteMatch)

module.exports = router