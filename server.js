var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var auth = require('./controllers/auth.js');
var Message = require('./controllers/message.js');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type, Autherization");
  next();
});


//get for message
app.get('/api/message', Message.get);
//post for message
app.post('/api/message', Message.post);

//post for auth
app.post('/auth/register', auth.register );

mongoose.connect("mongodb://test:test@ds035806.mlab.com:35806/meanmessages", function(err, db){
  if(!err){
    console.log("we are now connected to the MLAB");
  }
});

var server = app.listen(5000, function(){
  console.log('Listening on port ' + server.address().port);
});
