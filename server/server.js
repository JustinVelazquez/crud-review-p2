const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = 3001;

let db,
  dbURL = process.env.MONGODB_URL;
dbName = 'crypto';

// MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
//   console.log(`Connected to ${dbName} Database `);
//   db.client.db(dbName);
// });

MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, client) => {
  if (!err) {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  } else {
    console.log('Connection Error: ' + err);
  }
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('coins')
    .find()
    .toArray()
    .then((data) => {
      res.render('index.ejs', { coinInfo: data });
      console.log(data);
    })
    .catch((error) => console.log(error));
});

// app.get('/',(request, response)=>{
//     db.collection('coins').find().toArray()
//     .then(data => {
//         response.render('index.ejs', { coinInfo: data })
//         console.log(data)
//     })
//     .catch(error => console.error(error))
// })

app.post('/addCoin', (req, res) => {
  db.collection('coins')
    .insertOne(req.body)
    .then((result) => {
      console.log('Coin Added');
      res.redirect('/');
    })
    .catch((error) => console.log(error));
});

app.delete('/deleteCoin', (req, res) => {
  db.collection('coins')
    .deleteOne({ name: req.body.coinNameS })
    .then((result) => {
      console.log('Coin Deleted');
      response.json('Coin Deleted');
    })
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
