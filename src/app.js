const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const indicesRoutes = require('./routes/indices');
//const indicesFilterRoutes = require('./routes/indicesfilter');
const authRoutes = require('./routes/auth');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'images')));
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404)
  if ( req.accepts('json')){
      res.json({ message: "404 Not Found"})
  } else {
      res.type('txt').send('404 Not Found')
  }
})


// const allowedOrigins = ["https://app-taicon-osft.netlify.app", "http://jorges-macbook-pro.local:3000", "http://localhost:3000"]

// app.use(cors({
//   origin: allowedOrigins
// }));

// app.use((req, res, next) => {
//   // Set CORS headers so that the React SPA is able to communicate with this server
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET,POST,PUT,PATCH,DELETE,OPTIONS'
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use('/.netlify/functions/indices', indicesRoutes);
app.use('/indices', indicesRoutes);
// app.use('/.netlify/functions/indicesFilter', indicesFilterRoutes);
//app.use('/indicesFilter', indicesFilterRoutes);
// app.use('/.netlify/functions/', authRoutes);
app.use('/auth', authRoutes);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log("http://localhost:3200");
    app.listen(3200);
  }
});

// module.exports=app;

// module.exports.handler = serverless(app);