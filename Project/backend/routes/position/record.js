const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const positionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
positionRoutes.route("/position").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    db_connect
        .collection("position")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
positionRoutes.route("/position/:id").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("position")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
positionRoutes.route("/position/add").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myobj = {
        id: req.body.id,
        position: req.body.position,
        salary: req.body.salary,
    };
    db_connect.collection("position").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
positionRoutes.route("/position/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            id: req.body.id,
            position: req.body.position,
            salary: req.body.salary,
        },
    };
    db_connect.collection("position").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you delete a record
positionRoutes.route("/position/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("position").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = positionRoutes;