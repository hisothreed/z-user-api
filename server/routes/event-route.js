var app    = require('express')
var router = app.Router();
var {authenticate_user} = require('./../middleware/authentication');
var {authenticate_team_member} = require('./../middleware/authentication');
var userController = require('./../controllers/user-controller');
