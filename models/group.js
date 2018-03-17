
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var person = require('./person').schema;

var GroupSchema = new Schema({
  titolo: String,
  descrizione: String,
  componenti: [person],
  img: { data: String, contentType: String },
});

module.exports = mongoose.model('group', GroupSchema);
