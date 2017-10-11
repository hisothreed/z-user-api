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
  creator : {
    type: String,
    required  : true
  },
  owner   : {
    type: String,
    required  : true
  },
  members : [],
  created_at : Date
});
