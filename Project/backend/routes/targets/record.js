const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const targetsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
targetsRoutes.route("/targets").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("targets")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
targetsRoutes.route("/targets/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("targets").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
targetsRoutes.route("/targets/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		// name: req.body.name,
		// position: req.body.position,
		//level: req.body.level,
		//targetid : req.body.targetid,
		empno: req.body.empno,
		noofactions: req.body.noofactions,
		startdate: req.body.startdate,
		enddate: req.body.enddate,
	};
	db_connect.collection("targets").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
targetsRoutes.route("/target/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			//e: req.body.name,
			//position: req.body.position,
			//level: req.body.level,
			//targetid : req.body.targetid,
			empno: req.body.empno,
			noofactions: req.body.noofactions,
			startdate: req.body.startdate,
			enddate: req.body.enddate,
		},
	};
	db_connect.collection("targets").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
targetsRoutes.route("/targets/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("targets").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = targetsRoutes;
