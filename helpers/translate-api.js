var request = require('request');

exports.translate = function(word, callback) {

  // url of translation api
  var translateApiUrl = "http://translate.ge/Main/Translate?text=" + word + "&lang=en&";

  request(translateApiUrl, function (error, response, body) {
    var data = JSON.parse(body)[0];
    if(!error && data) {
      callback(null, data.Text);   
    } else if (!data) {
        callback(true, null);
    }    
  });

};
