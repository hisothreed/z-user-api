var Team = require('./../models/team-model');
var User = require('./../models/user-model');
var Schedule = require('./../models/schedule-model');
const _  = require('lodash');



exports.create_team = function(req ,res ) {
  var userData  = req.user;
  var userToken = req.token;
  var teamData  = _.pick(req.body,['team_name','description'])
  teamData.owner_id   = userData._id;
  teamData.creator_id = userData._id;
  teamData.members = [{member_id : userData._id}]
  Team.createTeam(teamData)
  .then(newTeam =>{
    res.send(newTeam)
  }).catch(e => {
    res.status(400).send(e);
  })
};

exports.add_member = function(req, res) {
  var senderData = req.user;
  var teamData = req.team;
  Team.addMember(req.body.member_id, teamData)
  .then(savedTeam => {
    res.send({ message: 'User added successfully', team_model : savedTeam })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.join_team = function(req, res) {
  var userData = req.user;
  var team_id   = req.body.team_id;
  Team.addMember(userData._id, team_id)
  .then(savedTeam => {
    res.send({ message: 'User added successfully', team_model : savedTeam })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.delete_team = function(req, res) {
  var team_id = req.params.team_id;
  Team.destory_team(team_id)
  .then(result => {
    res.send({ message : result });
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.list_team_schedules = function(req, res) {
  var team_id = req.params.team_id;
  Schedule.listTeamSchedules(team_id)
  .then(docs => {
    res.send({ schedules : docs })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.list_teams = function(req, res) {
  Team.listTeams()
  .then(docs => {
    res.send({ teams : docs })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.get_team = function(req , res) {
  var team_id = req.params.team_id;
  Team.getTeamInfo(team_id)
  .then(doc => {
    res.send(doc)
  })
  .catch(e => {
    res.status(400).send(e);
  })
}

exports.edit_team = function(req, res) {
  var team_id = req.params.team_id;
  Team.updateTeam(team_id ,req.body)
  .then(doc => {
    res.send({ message : 'Team updated successfully ', team : doc })
  })
  .catch(e => {
    res.status(400).send(e);
  })

}

exports.kick_member = function(req, res) {
  var senderData  = req.user;
  var member_id   = req.body.member_id;
  var team_id     = req.body.team_id;
  Team.removeMember(team_id ,member_id)
  .then(savedTeam => {
    res.send({ message: 'User removed successfully', team_model : savedTeam })
  })
  .catch(e => {
    res.status(400).send(e);
  })
}
