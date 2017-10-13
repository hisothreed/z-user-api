var express     = require('express')
var bodyParser  = require('body-parser')
var {mongoose}  = require('./db');
var db          = mongoose.connection;
const config    = require('./config/config');

mongoose.Promise = Promise;

var app = express();


var user = require('./routes/user-route.js');
var team = require('./routes/team-route.js');

app.use(bodyParser.json());


app.use('/z_user', user);
app.use('/z_team', team);

app.listen(config.PORT , () => {
  console.log('server is running at', config.PORT);
});
