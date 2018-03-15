var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublisherSchema = new Schema({
  nome: String,
});

module.exports = mongoose.model('publisher', PublisherSchema);
