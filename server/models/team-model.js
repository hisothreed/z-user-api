const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const _         = require('lodash');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const config    = require('./../config/config')
const ObjectId  = Schema.Types.ObjectId

var User = require('./user-model');

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
  members : [{
    member_id : {
      type: ObjectId
    },
    _id : false
  }],
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
  validateById(team_id) {
    var Team = this;
    return Team.findOne({_id : team_id})
    .then(team => {
      if (!team) {
        return Promise.reject();
      }
      return;
    })
    .catch(e => {
      return Promise.reject();
    })
  },
  listUserTeams(user_id) {
    var Team = this;
    return Team.find({ members : { member_id : user_id } })
  },
  listTeams() {
    var Team = this;
    return Team.find();
  },
  getTeamInfo(team_id) {
    var Team = this;
    return Team.findOne({ _id : team_id })
    .then(team => {
      if (!team) {
        return Promise.reject({ message : 'team_id is not valid' })
      }
      return team;
    })
    .catch(e => {
      return Promise.reject(e);
    })
  },
  createTeam(teamData) {
    var Team = new this(teamData);
    return Team.save()
    .then(doc => {
      return doc
    })
    .catch(e => {
      return Promise.reject(e);
    })
  },
  updateTeam(team_id ,reqBody) {
    var Team = this;
    var options = { name , description } = reqBody;
    return Team.findOneAndUpdate({_id : team_id}, options, {new : true})
    .then(doc => {
      return doc
    })
    .catch(e => {
      return Promise.reject(e);
    })
  },
  destory_team(team_id) {
    var Team = this;
    return Team.findOne({ _id : team_id })
    .then(teamPointer => {
      return teamPointer.remove()
      .then(res => {
        return 'Team removed'
      })
    })
    .catch(e => {
      return Promise.reject(e);
    })
  },
  validateUserMembership(user_id, team_id) {
    var Team = this;
    return Team.findOne({ _id : team_id ,members : { member_id : user_id } })
    .then(res => {
      return res;
    })
  },
  addMember(user_id, team_id) {
    var Team = this;
    return Team.findOneAndUpdate({ _id : team_id}, { $push: {
      members: { member_id : user_id } }
    }, {new: true})
    .then(savedTeam => {
      return savedTeam;
    })
    .catch(e => {
      return Promise.reject();
    })
  },
  removeMember(team_id, user_id) {
    var Team = this;

    return Team.findOneAndUpdate({ _id : team_id } , { $pull : {
      members : { member_id : user_id } }
    }, {new : true})
    .then(savedTeam => {
      return savedTeam;
    })
    .catch(e => {
      return Promise.reject(e);
    })
  }
}

var TeamModel =  mongoose.model('team',TeamSchema);


module.exports = mongoose.model('team',TeamSchema);
