const { Router } = require('express')
const { check } = require('express-validator')
const { addTeam, deleteTeam, updateTeamImage } = require('../controllers/team.controller')
const { checkFields } = require('../middlewares/check-fields')
const { teamExists, findLeagueById, findTeamById } = require('../helpers/database-validators')
const { checkImageFile } = require('../middlewares/check-image-file')

const router = Router()

router.post('/add', [
    checkImageFile,
    check('name', 'Team name is mandatory').not().isEmpty(),
    check('name').custom(teamExists),
    check('league', 'Team league is mandatory').not().isEmpty(),
    check('league').custom(findLeagueById),
    checkFields,
], addTeam)

router.delete('/:teamId', [
    check('teamId').not().isEmpty(),
    check('teamId').custom(findTeamById),
    checkFields
], deleteTeam)

router.put('/:teamId/image', [
    checkImageFile,
    check('teamId').isMongoId(),
    checkFields,
], updateTeamImage)

module.exports = router