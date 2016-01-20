var requestProxy = require('express-request-proxy');
var express = require('express');
port = process.env.PORT || 3000;
var app = express();

var request = require('request');
var layouts = require('express-ejs-layouts');

// var NODE_ENV = process.env.NODE_ENV || 'development';
// var BASE_URL = (NODE_ENV === 'production') ? 'https://patricktrompeter.herokuapp.com' : 'http://localhost:3000';

var proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
  }))(request, response);
};
// console.log('githubkeytest',process.env.GITHUB_TOKEN);

app.get('/github/*', proxyGitHub);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(layouts);
// app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('projects');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/resume', function(req, res){
  res.render('resume');
});


// What follows is just an api call from my 201 project, so I can refresh my memory on how to do it if we need it later.
// app.get('/api', function(req, res){
//   var linkrel2 = 'https://maps.googleapis.com/maps/api/js?key=';
//   var linkrel3 = MAPS_KEY + '&signed_in=true&libraries=places&callback=initMap ';
//   var superRel = linkrel2+linkrel3;
//   request(superRel, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body); // Show the HTML for the Google homepage.
//       res.send(body);
//     }
//   });


// });


app.listen(process.env.PORT || 3000);
