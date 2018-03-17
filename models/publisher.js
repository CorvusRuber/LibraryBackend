var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var type = require('./type').schema;

var PublisherSchema = new Schema({
  nome: String,
  descrizione: String,
  img: { data: Buffer, contentType: String },
  tipo: [type],
});

module.exports = mongoose.model('publisher', PublisherSchema);
