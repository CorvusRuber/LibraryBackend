
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var season = require('./season').schema;

var EpisodeSchema = new Schema({
  titolo: String,
  descrizione: String,
  img: { data: String, contentType: String },
  stagione: season,
  numero: Number,
});

module.exports = mongoose.model('episode', EpisodeSchema);
