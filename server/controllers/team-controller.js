var Team = require('./../models/team-model');
var User = require('./../models/user-model');
const _  = require('lodash');



exports.create_team = function(req ,res ) {
  var userData  = req.user;
  var userToken = req.token;
  var teamData  = _.pick(req.body,['team_name','description'])
  teamData.owner_id   = userData._id;
  teamData.creator_id = userData._id;
  teamData.members = [{member_id : userData._id}]
  Team.createTeam(teamData).then(newTeam =>{
    return User.assignTeam(newTeam,'creator');
  }).then(userData => {
    res.send(userData)
  }).catch(e => {
    res.status(400).send(e);
  })
};

exports.add_member = function(req, res) {
  var senderData = req.user;
  var teamData = req.team;
  Team.addMember(req.body.member_id, teamData)
  .then(savedTeam => {
    return User.addTeam(savedTeam._id , req.body.member_id);
  })
  .then(savedUser => {
    var resUserModel = _.pick(savedUser , ['first_name','last_name','email','updated_at'])
    res.send({ message: 'User added successfully', user_model : resUserModel })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}
exports.join_team = function(req, res) {
  var userData = req.user;
  var teamId   = req.params.team_id;
  Team.addMember(userData._id, teamId)
  .then(savedTeam => {
    return User.addTeam(savedTeam._id , userData._id);
  })
  .then(savedUser => {
    var resUserModel = _.pick(savedUser , ['first_name','last_name','email','updated_at','teams'])
    res.send({ message: 'User added successfully', user_model : resUserModel })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.kick_member = function(req, res) {
  var senderData  = req.user;
  var member_id   = req.body.member_id;
  var team_id     = req.params.team_id;
  console.log(member_id,team_id);
  Team.removeMember(team_id ,member_id)
  .then(savedTeam => {
    return User.removeTeam(team_id , member_id);
  })
  .then(savedUser => {
    var resUserModel = _.pick(savedUser , ['first_name','last_name','email','updated_at','teams'])
    res.send({ message: 'User removed successfully', user_model : resUserModel })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}
