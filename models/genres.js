
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  titolo: String,
  descrizione: String,
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('genre', GenreSchema);
