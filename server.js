// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongoAdmin:leviathan@localhost:27017/local?authSource=admin');

var db = mongoose.connection;

// db.on('open', function (ref) {
//     console.log('Connected to mongo server.');
//     //trying to get collection names
//     mongoose.connection.db.collectionNames(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         module.exports.Collection = names;
//     });
// })

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('open', function () {
  console.log("Connection established !!!");
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      names.forEach(function (e, i, a) {
        // mongoose.connection.db.dropCollection(e.name);
        console.log("Collection--->>", e.name);
      });
    }
  });
});
var Author = require('./models/author');
var Publisher = require('./models/publisher');
var Book = require('./models/book');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors);

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

router.get('/collections', function (req, res) {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      var response = new Array();
      names.forEach(function (e, i, a) {
        // mongoose.connection.db.dropCollection(e.name);
        console.log("Collection--->>", e.name);
        if (e.name && e.name != "startup_log" && e.name != "system.users") {
          response.push(e);
        }
      });
      res.json(response);
    }
  });
  // res.json(db.listCollections());
});
// LIBRI
router.route('/books')
  .post(function (req, res) {
    var book = new Book();
    book.titolo = req.body.titolo; // set the bears name (comes from the request)
    book.autore = req.body.autore;
    book.anno = req.body.anno;
    book.descrizione = req.body.descrizione;
    book.editore = req.body.editore;
    book.cover = req.body.cover;
    // save the bear and check for errors
    book.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Book created!' });
    });
  })
  .get(function (req, res) {
    Book.find({}, null, {
      sort: { autore: 1, titolo: 1 },
    }, function (err, books) {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
  });
// AUTORI
router.route('/authors')
  .post(function (req, res) {
    var author = new Author();
    author.nome = req.body.nome;
    author.cognome = req.body.cognome;
    author.nato = req.body.nato;
    author.morto = req.body.morto;
    author.descrizione = req.body.descrizione;
    author.img = req.body.img;
    // save the bear and check for errors
    author.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Author created!' });
    });
  })
  .get(function (req, res) {
    Author.find({}, null, {
      sort: { nome: 1, nato: 1 },
    }, function (err, authors) {
      if (err) {
        res.send(err);
      }
      res.json(authors);
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
