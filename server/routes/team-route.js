var app                        = require('express');
var router                     = app.Router();
var {authenticate_user}        = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var teamController             = require('./../controllers/team-controller');

router.post('/',authenticate_user , teamController.create_team);

router.post('/:team_id/add_member',authenticate_team_member ,teamController.add_member);

router.post('/:team_id/join',authenticate_user ,teamController.join_team);

router.post('/:team_id/kick_member',authenticate_team_member ,teamController.kick_member);

module.exports = router;
