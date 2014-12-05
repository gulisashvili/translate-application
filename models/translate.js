var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var translateSchema = new Schema({
  word: String,
  text: String
});

module.exports = mongoose.model('Translate', translateSchema);
