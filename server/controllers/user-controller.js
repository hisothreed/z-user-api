var User = require('./../models/user-model');
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

exports.destroy_user = function(req, res) {
  req.user.destroySessionToken(req.token).then(userDoc => {
    res.send('Session destroyed successfully');
  }).catch(e => {
    res.status(401).send(e);
  })
}

exports.get_user = function(req,res) {
  res.send({ name: 'name test' , _id : req.params.id });
}
