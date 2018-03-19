var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var group = require('./group').schema;
var genre = require('./genres').schema;
var publisher = require('./publisher').schema;

var AlbumSchema = new Schema({
    titolo: String,
    descrizione: String,
    img: { data: String, contentType: String },
    autore: [group],
    genere: [genre],
    anno: Number,
    editore: [publisher],
});

module.exports = mongoose.model('album', AlbumSchema);