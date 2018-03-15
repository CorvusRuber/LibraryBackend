var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublisherSchema = new Schema({
  nome: String,
  descrizione: String,
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('publisher', PublisherSchema);
