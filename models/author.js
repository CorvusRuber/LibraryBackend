var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  nome: String,
  cognome: String,
  nato: Number,
  morto: Number,
  descrizione: String,
  img: String,
});

module.exports = mongoose.model('author', AuthorSchema);

