var User = require('./../models/user-model');
var Team = require('./../models/team-model');
var Schedule = require('./../models/schedule-model');

var authenticate_user = function(req, res, next) {
  var token = req.header('z-auth');
  User.findByToken(token)
  .then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user  = user;
    req.token = token;
    next();
  })
  .catch((e) => {
    res.status(401).send();
  });
};
var authenticate_team_member = function(req, res, next) {
  var token = req.header('z-auth');
  User.findByToken(token)
  .then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user  = user;
    req.token = token;
    return Team.validateUserMembership(user._id, req.body.team_id || req.params.team_id)
  })
  .then(team => {
    if (!team) {
      return Promise.reject();
    }
    req.team = team;
    next();
  }).catch((e) => {
    res.status(404).send();
  });
};

var authenticate_schedule_creator = function(req, res, next) {
  var token = req.header('z-auth');
  User.findByToken(token)
  .then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user  = user;
    req.token = token;
    return Schedule.validateUserOwnership(user._id, req.body.schedule_id)
  })
  .then(schedule => {
    if (!schedule) {
      return Promise.reject();
    }
    req.schedule = schedule;
    next();
  }).catch((e) => {
    res.status(404).send();
  });
};


module.exports = {authenticate_user , authenticate_team_member , authenticate_schedule_creator};
