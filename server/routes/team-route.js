var app    = require('express');
var router = app.Router();
var {authenticate} = require('./../middleware/authintication');
var teamController = require('./../controllers/team-controller');
