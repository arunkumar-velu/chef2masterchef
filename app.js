var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

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

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 8000!');
});