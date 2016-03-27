var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var db = require('./db/db');
var dbURL = 'mongodb://arunmadcoder:test@ds025409.mlab.com:25409/chef2masterchef';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require(__dirname +"/router")(app);

app.set('port', (process.env.PORT || 8000));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/img", express.static(__dirname + '/public/img'));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/index.html');
});

db.connect(dbURL, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.',err)
    process.exit(1)
  } else {
	    app.listen(app.get('port'), function () {
		  console.log('Example app listening on port 8000!');
		});
    }
});

