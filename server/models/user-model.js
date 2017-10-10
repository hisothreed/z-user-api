const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const _         = require('lodash');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const config    = require('./../config/config')
const ObjectId  = Schema.Types.ObjectId;



var UserSchema = new Schema({
  first_name : {
    type: String,
    required : false
  },
  last_name : {
    type: String,
    required : false
  },
  email: {
    type: String,
    required : true,
    validate : {
      validator : validator.isEmail,
      message  : '{VALUE} is not valid email'
    }
  },
  password : {
    type: String,
    required : true,
    minlenght: 6
  },
  bio : {
    type: String,
    required : false
  },
  age : {
    type : Number,
    required : false
  },
  platform : {
    type : String,
    required : false,
    enum : ['psn','xboxlive']
  },
  region : {
    type : String,
    required : false
  },
  tokens : [{
    os : {
      type: String,
      required: false,
      enum : ['web']
    },
    token : {
      type: String,
      required: false
    }
  }],
  updated_at : {
    type : Date
  },
  created_at : {
    type : Date
  }
});


// SETTING PASSWORD --- HASHING
UserSchema.pre('save',function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
})
// setting dates
UserSchema.pre('save',function (next) {
  var user = this;
  var now  = new Date();
  user.updated_at = now;
  if ( !user.created_at ) {
    user.created_at = now;
    next();
  }else{
    next();
  }

})
UserSchema.statics.validateUser = function({email,password}) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password.toString(), user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({message: 'Wrong password',status : '400'});
        }
      });
    });
  })
};
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var token = jwt.sign({ _id : user._id.toHexString()}, config.JWT_SECRET);
  user.tokens.push({token : token});
  return user.save().then(savedUser => {
    return token
  });
}

UserSchema.statics.findByToken = function(token) {
  var user = this;
  try {
    var decoded = jwt.verify(token, config.JWT_SECRET);
  } catch(err) {
    return Promise.reject();
  }
  return user.findOne({
    _id : decoded._id,
    'tokens.token' : token
  })
}

UserSchema.statics.updateUserInfo = function(userData) {
  var User = this;
  return User.findOneAndUpdate({_id : userData._id }, {
    email : userData.email,
    password : userData.password,
    first_name : userData.first_name,
    last_name : userData.last_name,
  },(err ,doc) => {
    return new Promise((resolve,reject) => {
      if (!err) {
        resolve(_.pick(doc,['email','first_name','last_name']));
      }else{
        reject('Not Found');
      }
    })
  })
}

UserSchema.methods.destroySessionToken = function(token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
}

var UserModel =  mongoose.model('user',UserSchema);


module.exports = mongoose.model('user',UserSchema);;
