var express     = require('express')
var bodyParser  = require('body-parser')
var {mongoose}  = require('./db');
var db          = mongoose.connection;


var app = express();


var user = require('./routes/user-route.js');

app.use(bodyParser.json());


app.use('/z_user',user);

app.listen(3000 , () => {
  console.log('server is running at 3000');
});
