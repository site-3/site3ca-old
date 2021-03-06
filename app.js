var express = require('express');
var http = require('http');
require('sugar');

var app = express();

var conf = {
  title: 'Site 3 coLaboratory art and technology workspace in Toronto',
  site_url: 'http://site3.ca'
};

app.locals.title = conf.title;

app.configure(function(){
  app.set('port', process.env.PORT || 8882);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static('public'));
});

// Handle 404
app.use(function(req, res) {
  app.locals.body_class = "404";
  res.render('404');
});

// Handle other errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, "Check the logs :(");
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  app.locals.body_class = "landing";
  res.render('index');
});

app.get('/about/location/', function(req, res){
  res.redirect('/location');
});

app.get('/learning/', function(req, res){
  res.redirect('/classes');
});

app.get('/events/open/', function(req, res){
  res.redirect('/classes');
});

['about', 'membership', 'classes', 'tools', 'projects', 'location'].each(function(string){
  app.get('/' + string, function(req, res){
    app.locals.page_title = string.capitalize();
    app.locals.body_class = string;
    res.render(string);
    app.locals.page_title = undefined;
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
