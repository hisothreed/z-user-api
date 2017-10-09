var User = require('./../models/user-model');


var authenticate = function(req, res, next) {
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

module.exports = {authenticate};
