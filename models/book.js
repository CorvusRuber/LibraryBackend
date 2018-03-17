
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var publisher = require('./publisher').schema;
var author = require('./author').schema;
var genre = require('./genres').schema;
var series = require('./series').schema;

var BookSchema = new Schema({
  titolo: String,
  autore: [author],
  anno: Number,
  editore: [publisher],
  descrizione: String,
  img: { data: String, contentType: String },
  genre: [genre],
  serie: [series],
  numero: Number,
  isbn: String,
});

module.exports = mongoose.model('book', BookSchema);
