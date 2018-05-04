var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http').createServer(app);

// View Engine
app.set('view engine' , 'ejs' );
app.set('views' , path.join(__dirname, 'views'));

// Static Path
app.use(express.static(path.join(__dirname, 'static')));

// Body Parser (Do I need This???)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

http.listen(3000, function(){
    console.log('APP IS HERE: http://localhost:3000');
});

// Routers/pages
app.get('/', home);

function home(req, res) {
  res.render('index')
}