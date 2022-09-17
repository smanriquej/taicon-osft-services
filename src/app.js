require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//const indicesRoutes = require('./routes/indices');
//const indicesFilterRoutes = require('./routes/indicesfilter');
//const authRoutes = require('./routes/auth');
const db = require('./db');

const PORT = process.env.PORT || 3000 

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'));
app.use('/indices', require('./routes/indices'));
app.use('/indicesFilter', require('./routes/filter'));
app.use('/auth', require('./routes/auth'));

// app.all('*', (req, res) => {
//   res.status(404)
//   if ( req.accepts('json')){
//       res.json({ message: "404 Not Found"})
//   } else {
//       res.type('txt').send('404 Not Found')
//   }
// })


// const allowedOrigins = ["https://app-taicon-osft.netlify.app", "http://jorges-macbook-pro.local:3000", "http://localhost:3000"]

// app.use(cors({
//   origin: allowedOrigins
// }));

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${PORT}`);
    app.listen(PORT);
  }
});

module.exports=app;

// module.exports.handler = serverless(app);