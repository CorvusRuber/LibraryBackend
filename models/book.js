
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
  img: { data: Buffer, contentType: String },
  isbn: String,
});

module.exports = mongoose.model('book', BookSchema);
