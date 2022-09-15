const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const indicesRoutes = require('./routes/indices');
const indicesFilterRoutes = require('./routes/indicesfilter');
const authRoutes = require('./routes/auth');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/indices', indicesRoutes);
app.use('/indicesFilter', indicesFilterRoutes);
app.use('/', authRoutes);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3200);
  }
});