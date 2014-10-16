var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var TranslateSchema = new Schema({
  word: String,
  text: String
});

module.exports = mongoose.model('Translate', TranslateSchema);
