// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

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
var Person = require('./models/person');
var Publisher = require('./models/publisher');
var Book = require('./models/book');
var Genre = require('./models/genres');
var Group = require('./models/group');

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
  console.log('Something is happening on ' + req.url);
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
    book.img.data = new Buffer(fs.readFileSync(req.body.img), "binary").toString('base64');
    book.img.contentType = 'image/' + req.body.img.substring(req.body.img.indexOf('.') + 1);
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
// PERSONE
router.route('/persons')
  .post(function (req, res) {
    var person = new Person();
    person.nome = req.body.nome;
    person.cognome = req.body.cognome;
    person.nato = req.body.nato;
    person.morto = req.body.morto;
    person.descrizione = req.body.descrizione;
    person.img = req.body.img;
    person.tipo = req.body.tipo;
    // save the bear and check for errors
    person.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Person created!' });
    });
  })
  .get(function (req, res) {
    Person.find({}, null, {
      sort: { nome: 1, nato: 1 },
    }, function (err, authors) {
      if (err) {
        res.send(err);
      }
      res.json(authors);
    });
  });
// GRUPPO

// EDITORI
router.route('/publishers')
  .post(function (req, res) {
    var publisher = new Publisher();
    publisher.nome = req.body.nome;
    publisher.descrizione = req.body.descrizione;
    publisher.tipo = req.body.tipo;
    // save the bear and check for errors
    publisher.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Author created!' });
    });
  })
  .get(function (req, res) {
    Publisher.find({}, null, {
      sort: { nome: 1 },
    }, function (err, publishers) {
      if (err) {
        res.send(err);
      }
      console.dir(publishers);
      res.json(publishers);
    });
  });

// GENERI
router.route('/genres')
  .post(function (req, res) {
    var genre = new Genre();
    genre.titolo = req.body.titolo;
    genre.descrizione = req.body.descrizione;
    genre.img = req.body.img;
    // save the bear and check for errors
    genre.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Author created!' });
    });
  })
  .get(function (req, res) {
    Genre.find({}, null, {
      sort: { nome: 1, nato: 1 },
    }, function (err, authors) {
      if (err) {
        res.send(err);
      }
      res.json(authors);
    });
  });


// Custom search
router.route('/find')
  .post(function (req, res) {
    var genre = new Genre();
    genre.titolo = req.body.titolo;
    genre.descrizione = req.body.descrizione;
    genre.img = req.body.img;
    // save the bear and check for errors
    genre.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Author created!' });
    });
  })
  .get(function (req, res) {
    Genre.find({}, null, {
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
