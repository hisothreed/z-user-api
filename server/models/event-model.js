const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const _         = require('lodash');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const config    = require('./../config/config')
const ObjectId  = Schema.Types.ObjectId;

var EventSchema = new Schema({
  name : {
    type: String,
    required : true
  },
	description : {
    type: Stringm
    required : true
  },
  start_time : {
    type: Date,
    required : true
  },
  platform : {
    type: String,
    enum : ['psn','xboxlive']
  },
	end_time : {
    type: Date,
    required : true
  },
  invitaions : [],
  privacy : {
    type: String,
    enum : ['private','public']
  },
  game : {
    type: String,
    required : true
  },
  updated_at : {
    type : Date
  },
  created_at : {
    type : Date
  }
});

// MIDDLEWARE -- PRE SAVE-UPDATE-DELETE



// UserSchema.pre('save',function (next) {
//   next();
// })
// setting dates

// UserSchema.pre('save',function (next) {
//   var user = this;
//   var now  = new Date();
//   user.updated_at = now;
//   if ( !user.created_at ) {
//     user.created_at = now;
//     next();
//   }else{
//     next();
//   }
// })

// UserSchema.pre('update',function (next) {
//   var user = this;
//   var now  = new Date();
//   user.updated_at = now;
//   if ( !user.created_at ) {
//     user.created_at = now;
//     next();
//   }else{
//     next();
//   }
// })

// CLASS METHODS (STATICS)
EventSchema.statics = {
  createEvent(eventData) {
    var Event = this;
  }
}

var EventModel =  mongoose.model('event',EventSchema);


module.exports = mongoose.model('event',EventSchema);;
