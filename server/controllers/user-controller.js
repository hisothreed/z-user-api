var User = require('./../models/user-model');
var Team = require('./../models/team-model');
const _  = require('lodash');

exports.create_user = function(req,res) {
  var userData = _.pick(req.body,['email','password']);
  var user = new User(userData);
  user.save().then((userModel) => {
    res.send(_.pick(userModel,['email','id']));
  }).catch((e) => {
    res.status(400).send(e);
  })
}

exports.auth_user = function(req,res) {
  var userData = _.pick(req.body,['email','password']);
  User.validateUser(userData).then(user => {
    return user.generateAuthToken();
  }).then(token => {
    res.send({ token });
  }).catch(e => {
    res.status(400).send(e)
  });
}

exports.get_user = function(req,res) {
  res.send({ name: 'name test' , _id : req.params.id });
}

exports.update_user = function(req, res) {
  var userData = _.pick(req.body, ['email','password','first_name','last_name'])
  userData._id = req.user._id;
  User.updateUserInfo(userData).then((userModel) => {
    res.send(userModel)
  }).catch(e => {
    res.status(400).send(e);
  })
}

exports.destroy_user = function(req, res) {
  req.user.destroySessionToken(req.token).then(userDoc => {
    res.send('Session destroyed successfully');
  }).catch(e => {
    res.status(401).send(e);
  })
}

exports.add_friend = function(req, res) {
  var senderModel = req.user;
  var recieverId = req.body.user_id;
  User.addFriend(recieverId ,senderModel._id)
  .then(senderModel => {
    res.send('User added successfully');
  })
  .catch(e => {
    res.status(400).send();
  })

}

exports.remove_friend = function(req, res) {
  var senderModel = req.user;
  var friendId = req.body.user_id;
  User.removeFriend(friendId ,senderModel._id)
  .then(message => {
    res.send(message);
  })
  .catch(e => {
    res.status(400).send(e);
  })

}

exports.remove_team = function(req, res) {
  var userData = req.user;
  User.removeTeam(req.body.team_id, userData._id)
  .then(savedUser => {
    return Team.removeMember(req.body.team_id , userData._id);
  })
  .then(savedTeam => {
    res.send(savedUser);
  })
  .catch(e => {
    res.status(400).send(e);
  })
}
