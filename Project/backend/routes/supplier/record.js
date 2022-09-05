const express = require('express');

// recordRoutes is a instance 

const recordRoutes = express.Router();

const dbo = require('../../db/conn');

const ObjectId = require('mongodb').ObjectId;

supplierRoutes.route("/supplier").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    db_connect
      .collection("supplier")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  supplierRoutes.route("/supplier/:id").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("supplier")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

 supplierRoutes.route("/supplier/add").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myobj = {
      //supplierid: req.body.supplierid,
      supplierfname: req.body.supplierfname,
      supplierlname: req.body.supplierlname,
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      contactnumber: req.body.contactnumber,
      imgurl: req.body.imgurl,
    };
    db_connect.collection("supplier").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  supplierRoutes.route("/supplier/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
      //supplierid: req.body.supplierid,
      supplierfname: req.body.supplierfname,
      supplierlname: req.body.supplierlname,
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      contactnumber: req.body.contactnumber,
      imgurl: req.body.imgurl,
      },
    };
    db_connect.collection("supplier").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  supplierRoutes.route("/supplier/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("supplier").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });

module.exports = supplierRoutes;