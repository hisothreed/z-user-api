var User = require('./../models/user-model');
const _  = require('lodash');

exports.create_user = function(req,res) {
  console.log(req.body);
  var userData = _.pick(req.body,['email','password']);
  var user = new User(userData);
  user.save().then((userModel) => {
    res.send(userModel);
  }).catch((e) => {
    res.status(400).send(e);
  })
}

exports.get_user = function(req,res) {
  res.send({ name: 'name test' , _id : req.params.id });
}
