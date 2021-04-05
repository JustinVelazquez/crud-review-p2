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
    .sort({ likes: -1 })
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

// app.post('/addCoin', (req, res) => {
//   db.collection('coins')
//     .insertOne({
//       name: req.body.coinNameS,
//       price: req.body.coinPriceS,
//       likes: 0,
//     })
//     .then((result) => {
//       console.log('Coin Added');
//       res.redirect('/');
//     })
//     .catch((error) => console.log(error));
// });

app.post('/addCoin', (req, res) => {
  db.collection('coins')
    .insertOne({ name: req.body.name, price: req.body.price, likes: 0 })
    .then((result) => {
      console.log('Coin Added');
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});

app.delete('/deleteCoin', (req, res) => {
  db.collection('coins')
    .deleteOne({ name: req.body.coinNameS })
    .then((result) => {
      console.log('Coin Deleted');
      res.json('Coin Deleted');
    })
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});

app.put('/updateLikes', (req, res) => {
  db.collection('coins')
    .updateOne(
      {
        name: req.body.coinNameS,
        price: req.body.coinPriceS,
        likes: req.body.coinLikesS,
      },
      {
        $set: {
          likes: req.body.coinLikesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        //upsert: true,
      }
    )
    .then((result) => {
      console.log('Added one like');
      res.json('Like Added');
    })
    .catch((error) => console.log(error));
});
