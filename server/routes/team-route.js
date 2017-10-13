var app    = require('express');
var router = app.Router();
var authenticate_user = require('./../middleware/authentication');
var teamController    = require('./../controllers/team-controller');

router.post('/',authenticate_user, teamController.create_team);

module.exports = router;
