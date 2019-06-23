var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var path = require('path');
var joinpath = require('join-path');
var purify = require("purify-css")
var CleanCSS = require('clean-css');
var uncss = require('uncss');


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname + '/public'));



app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5555");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.set('port', process.env.PORT || 5555)


//block the header containg information about our server
app.disable('X-powered-by');

//set directory 
var website_router = express.Router();
require('./customeRouter/website')(website_router);
app.use('/website',website_router)
app.use('/website',express.static(__dirname + '/public'));

var uncss_router = express.Router();
require('./customeRouter/uncss')(uncss_router);
app.use('/uncss',uncss_router)
app.use('/uncss',express.static(__dirname + '/public'));




app.use(express.static(__dirname + '/public'));


//tell our application which port to listen
app.listen(app.get('port'), function() {
    console.log('Ready at the port' + app.get('port') + "  " + "http://127.0.0.1:5555/")
})

