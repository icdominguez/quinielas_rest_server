const { Router } = require('express')
const { check } = require('express-validator')
const { addMatch } = require('../controllers/match.controller')
const { checkFields } = require('../middlewares/check-fields')
const { teamExists } = require('../helpers/database-validators')

const router = Router()

router.post('/', [
    check('home_team_info.team_id', 'No home team id provided').notEmpty(),
    check('home_team_info.team_id', 'Invalid id provided for home team').isMongoId(),
    check('home_team_info.team_id', 'Home team does not exists').custom(teamExists),
    check('away_team_info.team_id', 'No away team id provided').notEmpty(),
    check('away_team_info.team_id', 'Invalid id provided for away team').isMongoId(),
    check('away_team_info.team_id', 'Home team does not exists').custom(teamExists),
    checkFields
], addMatch)

module.exports = router