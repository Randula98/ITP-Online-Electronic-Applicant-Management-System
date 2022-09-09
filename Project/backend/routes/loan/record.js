const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const loanRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
loanRoutes.route("/loan").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("loan")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
loanRoutes.route("/loan/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("loan").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
loanRoutes.route("/loan/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		loanid: req.body.loanid,
		loandate: req.body.loandate,
		duedate: req.body.duedate,
		amount: req.body.amount,
		loanpurpose: req.body.loanpurpose,
		employeeid: req.body.employeeid,
	};
	db_connect.collection("loan").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
loanRoutes.route("/loan/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			loanid: req.body.loanid,
			loandate: req.body.loandate,
			duedate: req.body.duedate,
			amount: req.body.amount,
			loanpurpose: req.body.loanpurpose,
			employeeid: req.body.employeeid,
		},
	};
	db_connect.collection("loan").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
loanRoutes.route("/loan/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("loan").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = loanRoutes;
