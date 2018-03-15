var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  nome: String,
  cognome: String,
  nato: String,
  morto: String,
  descrizione: String,
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('author', AuthorSchema);

