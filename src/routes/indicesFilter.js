const Router = require('express').Router;
// const mongodb = require('mongodb');

const db = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
  db.getDb()
    .db()
    .collection("cuoc_indice01")
    .find({ longitud_indice: "5" }, { projection: {_id:1, cod_indice:1, nombre_cuoc_indice:1}})
    .toArray((err, results) => {
      if (err){
        console.log(err);
        res.status(500).json({ message: 'An error occurred geting filter.' });      
      }
      console.log("Ok filter!");
      res.status(200).json(results);
    })
});

module.exports = router;