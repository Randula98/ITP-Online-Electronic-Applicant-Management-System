const express = require("express");
const router = express.Router();
const dbo = require("../../db/conn");
const ObjectId = require("mongodb").ObjectId;

supplier-rankingRoutes.route("/supplier-ranking").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    db_connect
      .collection("supplier-ranking")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  supplier-rankingRoutes.route("/supplier-ranking/:id").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("supplier-ranking")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
  
  supplier-rankingRoutes.route("/supplier-ranking/add").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myobj = {

        supplierid: req.body.supplierid,
        noofitems: req.body.noofitems,
        rank: req.body.rank,
        date: req.body.date,
      
    };
    db_connect.collection("supplier-ranking").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  supplier-rankingRoutes.route("/supplier-ranking/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        supplierid: req.body.supplierid,
        noofitems: req.body.noofitems,
        rank: req.body.rank,
        date: req.body.date,
       
      },
    };
    db_connect.collection("supplier-ranking").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  supplier-rankingRoutes.route("/supplier-ranking/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("supplier-ranking").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  }); 

  module.exports = supplier-rankingRoutes;