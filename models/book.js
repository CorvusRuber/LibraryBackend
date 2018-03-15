
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var publisher = require('./publisher').schema;
var author = require('./author').schema;

var BookSchema = new Schema({
  titolo: String,
  autore: [author],
  anno: Number,
  editore: [publisher],
  descrizione: String,
  cover: String,
});

module.exports = mongoose.model('library', BookSchema);
