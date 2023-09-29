const express = require("express");

// monstreRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /monstre.
const monstreRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the monstres.
monstreRoutes.route("/monstres").get(function (req, res) {
  let db_connect = dbo.getDb("TCG");
  db_connect
    .collection("Monstres")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single monstre by id
monstreRoutes.route("/monstres/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Monstres").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new monstre.
monstreRoutes.route("/monstres/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    nom: req.body.nom,
    hp: req.body.hp,
    attaques: req.body.attaques.join(", "),
  };
  db_connect.collection("Monstres").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a monstre by id.
monstreRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      nom: req.body.nom,
      HP: req.body.HP,
      attaques: req.body.attaques,
    },
  };
  db_connect
    .collection("Monstres")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a monstre
monstreRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Monstres").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = monstreRoutes;
