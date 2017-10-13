const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const _         = require('lodash');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const config    = require('./../config/config')
const ObjectId  = Schema.Types.ObjectId

var TeamSchema = new Schema({
  team_name : {
    type: String,
    required  : true
  },
  description : String,
  creator_id : {
    type: ObjectId,
    required  : true
  },
  owner_id : {
    type: ObjectId,
    required  : true
  },
  members : [],
    created_at : Date
});

// setting dates
TeamSchema.pre('save',function (next) {
  var team = this;
  var now  = new Date();
  team.updated_at = now;
  if ( !team.created_at ) {
    team.created_at = now;
    next();
  }else{
    next();
  }
})
TeamSchema.pre('update',function (next) {
  var team = this;
  var now  = new Date();
  team.updated_at = now;
  if ( !team.created_at ) {
    team.created_at = now;
    next();
  }else{
    next();
  }
})


TeamSchema.statics = {
  createTeam(teamData) {
    var team = new this(teamData);
    return team.save()
    .then(doc => {
      return doc
    })
    .catch(e => {
      return Promise.reject(e);
    })
  }
}

var TeamModel =  mongoose.model('team',TeamSchema);


module.exports = mongoose.model('team',TeamSchema);
