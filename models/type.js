var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
  nome: String,
  descrizione: String,
});

module.exports = mongoose.model('type', TypeSchema);

