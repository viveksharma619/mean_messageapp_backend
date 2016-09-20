var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Message = mongoose.model('Message',{
  msg :String
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type, Autherization");
  next();
});


//get request
app.get('/api/message', GetMessages);

app.post('/api/message', function(req, res){
  console.log(req.body);
  
  var message = new Message(req.body);
  message.save();
});


mongoose.connect("mongodb://test:test@ds035806.mlab.com:35806/meanmessages", function(err, db){
  if(!err){
    console.log("we are now connected to the MLAB");
  }
});

function GetMessages(req, res){
  Message.find({}).exec(function(err, result){
    if(!err) {
    res.send(result);
    }
  });
}


var server = app.listen(5000, function(){
  console.log('Listening on port ' + server.address().port);
});
