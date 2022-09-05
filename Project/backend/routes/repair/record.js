const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const repairRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// This section will help you get a list of all the records.
repairRoutes.route("/repair").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    db_connect
        .collection("repair")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
repairRoutes.route("/repair/:id").get(function (req, res) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("repair")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
repairRoutes.route("/repair/add").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myobj = {
        // name: req.body.name,
        // position: req.body.position,
        // level: req.body.level,
        customerid: req.body.customerid,
        employeeid: req.body.employeeid,
        repairdate: req.body.repairdate,
        itemname: req.body.itemname,
        repaidescription: req.body.repaidescription,
        repairfee: req.body.repairfee,
        
    };
    db_connect.collection("repair").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
repairRoutes.route("/repair/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            // name: req.body.name,
            // position: req.body.position,
            // level: req.body.level,
            customerid: req.body.customerid,
            employeeid: req.body.employeeid,
            repairdate: req.body.repairdate,
            itemname: req.body.itemname,
            repaidescription: req.body.repaidescription,
            repairfee: req.body.repairfee,
        },
    };
    db_connect.collection("repair").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you delete a record
repairRoutes.route("/repair/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb("synthetic");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("repair").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});
module.exports = repairRoutes;