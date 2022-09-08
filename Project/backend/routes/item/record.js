const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const itemRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
itemRoutes.route("/item").get(function (req, res) {
  let db_connect = dbo.getDb("synthetic");
  db_connect
    .collection("item")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
itemRoutes.route("/item/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("synthetic")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
itemRoutes.route("/item/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    itemid: req.body.itemid,
    itemname: req.body.itemname,
    unitprice: req.body.unitprice,
    itemtype: req.body.itemtype,
    unitstock: req.body.unitstock,
    imgurl: req.body.imgurl,

  };
  db_connect.collection("item").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
itemRoutes.route("/item/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("synthetic");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
        itemid: req.body.itemid,
        itemname: req.body.itemname,
        unitprice: req.body.unitprice,
        itemtype: req.body.itemtype,
        unitstock: req.body.unitstock,
        imgurl: req.body.imgurl,
    },
  };
  db_connect.collection("item").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete a record
itemRoutes.route("item/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb("synthetic");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("item").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = itemRoutes;