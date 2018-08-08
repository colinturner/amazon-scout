const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const PRODUCTS_COLLECTION = 'products';

const app = express();
app.use(bodyParser.json());

// Create a database variable outside of database connection callback to reuse the connection pool in app.
let db;

// Connect to database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log('Database connection ready');

  // Initialize app.
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log('App now running on port', port);
  });
});

// PRODUCTS API ROUTES BELOW
const handleError = (res, reason, message, code) => {
  console.log('Error: ', reason);
  res.status(code || 500).json({'error': message});
}

  // '/api/products'
  //   GET: finds all products
  //   POST: creates a new product

  app.get('/api/products', (req, res) => {
    db.collection(PRODUCTS_COLLECTION).find({}).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, 'Failed to get products.');
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    newProduct.createDate = new Date();

    if (!req.body.name) {
      handleError(res, 'Invalid user input', 'Must provide a name', 400);
    } else {
      db.collection(PRODUCTS_COLLECTION).insertOne(newProduct, (err, doc) => {
        if (err) {
          handleError(res, err.message, 'Failed to store new product');
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

  // '/api/products/:id'
  // GET: find product by id
  // PUT: update product by id
  // DELETE: delete product by id

  app.get('/api/products/:id', (req, res) => {
    db.collection(PRODUCTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
      if (err) {
        handleError(res, err.message, 'Failed to get product');
      } else {
        res.status(200).json(doc);
      }
    })
  });

  app.put('/api/products/:id', (req, res) => {
    let updateDoc = req.body;
    delete updateDoc._id;

    db.collection(PRODUCTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, (err, doc) => {
      if (err) {
        handleError(res, err.message, 'Failed to update product');
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    })
  });

  app.delete('/api/products/:id', (req, res) => {
    db.collection(PRODUCTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, (err, result) => {
      if (err) {
        handleError(res, err.message, 'Failed to delete product');
      } else {
        res.status(200).json(req.params.id);
      }
    })
  });