require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const indicesRoutes = require('./routes/indices');
const indicesFilterRoutes = require('./routes/filter');
const authRoutes = require('./routes/auth');
const db = require('./db');

const PORT = process.env.PORT || 3200 
const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    )
    return res.status(200).json({})
  };
  next();
});

app.use('/indices', indicesRoutes);
app.use('/indicesFilter', indicesFilterRoutes);
app.use('/', authRoutes);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${PORT}`);
    app.listen(PORT);
  }
});