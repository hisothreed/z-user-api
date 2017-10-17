var User = require('./../models/user-model');
var Team = require('./../models/team-model');

var authenticate_user = function(req, res, next) {
  var token = req.header('z-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};
var authenticate_team_member = function(req, res, next) {
  var token = req.header('z-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user  = user;
    req.token = token;
    return Team.validateUserMembership(user._id)
  }).then(team => {
    if (!team) {
      return Promise.reject();
    }
    req.team = team;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
}
module.exports = {authenticate_user , authenticate_team_member};
