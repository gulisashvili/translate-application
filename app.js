
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , translator = require('./helpers/translate-api')
  , mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/db");

var app = module.exports = express.createServer();

// Configuration

var Translate = require('./models/translate');


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);
app.post('/translate', function(req, res) {
  var data = req.body.word;
  Translate.findOne( { word: data}, function(err, doc) {
    if(err) {
      console.log(err)
    } else if (doc) {
        res.json(doc);
    } else if (!doc) {
        translator.translate(data, function(err, result) {
          if(err) { 
            res.json({ error: "error" });
          } else if (result) {
              var translationData = {
                word: data,
                text: result
              };
          
          var translatedData = new Translate(translationData);
          translatedData.save(function(err) {
            if(err) { throw err };
          });
          res.json(translationData);
          }
      });
    }
  });
});





app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
