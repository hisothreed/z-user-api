var Team = require('./../models/team-model');
var User = require('./../models/user-model');
const _  = require('lodash');



exports.create_team = function(req ,res ) {
  var userData  = req.user;
  var userToken = req.token;
  var teamData  = _.pick(req.body,['team_name','description'])
  teamData.owner_id   = userData._id;
  teamData.creator_id = userData._id;
  Team.createTeam(teamData).then(newTeam =>{
    return User.assignTeam(newTeam,'creator');
  }).then(userData => {
    res.send(userData)
  }).catch(e => {
    res.status(400).send(e);
  })
  // Team.createTeam(teamData)
  // .then(newTeam => {
  //   newTeam.role = creator;
  //   console.log(newTeam);
  //   res.send(teamData)
  //   // return User.assignTeam(newTeam);
  // }).catch(e => {
  //   res.status(400).send(e);
  // })
  // .then(updated_user => {
  //   console.log(update_user);
  //
  // })


};
