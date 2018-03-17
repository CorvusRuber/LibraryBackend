
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeasonSchema = new Schema({
  titolo: String,
  descrizione: String,
  img: { data: String, contentType: String },
  stagione: Number,
});

module.exports = mongoose.model('season', SeasonSchema);
