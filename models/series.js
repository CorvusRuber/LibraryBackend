
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var type = require('./type').schema;
var genre = require('./genres').schema;

var SeriesSchema = new Schema({
  titolo: String,
  descrizione: String,
  img: { data: String, contentType: String },
  tipo: [type],
  genere: [genre],
});

module.exports = mongoose.model('series', SeriesSchema);
