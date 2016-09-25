var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var auth = require('./controllers/auth.js');
var message = require('./controllers/message.js');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
//get for message
app.get('/api/message', message.get);
//post for message
app.post('/api/message',checkAuthenticated ,message.post);

//post for auth
app.post('/auth/register', auth.register );
app.post('/auth/login', auth.login);

mongoose.connect("mongodb://test:test@ds035806.mlab.com:35806/meanmessages", function(err, db){
  if(!err){
    console.log("we are now connected to the MLAB");
  }
});

var server = app.listen(5000, function(){
  console.log('Listening on port ' + server.address().port);
});
