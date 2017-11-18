var express    = require('express');
var app        = express();
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var chalk        = require("chalk");
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('./models/user.model');

var db = mongoose.connect('mongodb://localhost:27017/VB2018');

var PORT = 3000;
var config = {'secret': 'titkokulcs1234'}; // secret key for JWT authentication

var users=[
{
  name:"admin",
  password:"admin123"
},
{
  name:"cmpuser",
  password:"cmpuser123"
}
]

app.set('superSecret', config.secret);
app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var whitelist = ['http://localhost:4200', 'http://beerlak.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

var port = PORT;

// ROUTES FOR OUR Application
// ===========================
var appRouter = express.Router();

appRouter.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/www/index.html'));
});

apiRouter = require("./routes/api")(User,users,app);

app.use('/api', apiRouter);
app.use('/', appRouter);

// START THE SERVER
// =================
app.listen(port);
console.log('API is running on port ' + port);