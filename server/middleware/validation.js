var User = require('./../models/user-model');
var Team = require('./../models/team-model');

var validate_parent = function(parent_type, parent_id) {
  console.log('inside');
  if (parent_type === 'user' && parent_id) {
    return User.validateById(parent_id)
    .then((user) => {
      return Promise.resolve(user);
    })
    .catch(e => {
      return Promise.reject({ message : 'parent_id is not valid', error : e })
    })
  }
  if (parent_type === 'team' && parent_id){
    return Team.validateById(parent_id)
    .then(() => {
      return Promise.resolve();
    })
    .catch(e => {
      return Promise.reject({ message : 'parent_id is not valid', error : e })
    })
  }
};

module.exports = { validate_parent };
