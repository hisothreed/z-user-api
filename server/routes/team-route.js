var app                        = require('express');
var router                     = app.Router();
var {authenticate_user}        = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var teamController             = require('./../controllers/team-controller');

router.post('/',authenticate_user ,teamController.create_team);

router.post('/add_member',authenticate_team_member ,teamController.add_member);

router.post('/join',authenticate_user ,teamController.join_team);

router.post('/kick_member',authenticate_team_member ,teamController.kick_member);

router.delete('/:team_id',authenticate_team_member ,teamController.delete_team);

router.get('/list_teams', authenticate_user ,teamController.list_teams);

router.get('/:team_id/list_schedules', authenticate_user ,teamController.list_team_schedules);

router.get('/:team_id', authenticate_user ,teamController.get_team);

router.put('/:team_id', authenticate_team_member ,teamController.edit_team);


module.exports = router;
