// BASE SETUP
// =============================================================================

// call the packages we need

import * as mongoose from 'mongoose';
import * as express from "express";
import * as bodyParser from "body-parser";
var app = express(); // define our app using express

mongoose.connect('mongodb://mongoAdmin:leviathan@localhost:27017/local?authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection established !!!");
});
var Publisher = require('./models/publisher');
var Author = require('./models/author');
var Book = require('./models/book');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/books')
  .post(function (req, res) {
    var book = new Book();
    book.titolo = req.body.titolo; // set the bears name (comes from the request)
    book.autore = req.body.autore;
    book.anno = req.body.anno;
    // save the bear and check for errors
    book.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Book created!' });
    });
  })
  .get(function (req, res) {
    Book.find(function (err, books) {
      if (err) {
        res.send(err);
      }

      res.json(books);
    });
  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
