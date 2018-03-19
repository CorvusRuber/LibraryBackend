var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var type = require('./type').schema;

var PersonSchema = new Schema({
  nome: String,
  cognome: String,
  nato: String,
  morto: String,
  descrizione: String,
  img: { data: Buffer, contentType: String },
  tipo: [type],
});
module.exports = mongoose.model('person', PersonSchema);
