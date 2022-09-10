const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const discountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
discountRoutes.route("/discount").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("discount")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
discountRoutes.route("/discount/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("discount").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
discountRoutes.route("/discount/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		// name: req.body.name,
		// position: req.body.position,
		//level: req.body.level,

		precentage: req.body.precentage,
		startdate: req.body.startdate,
		enddate: req.body.enddate,
		remarks: req.body.remarks,
	};
	db_connect.collection("discount").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
discountRoutes.route("/discount/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			//e: req.body.name,
			//position: req.body.position,
			//level: req.body.level,

			precentage: req.body.precentage,
			startdate: req.body.startdate,
			enddate: req.body.enddate,
			remarks: req.body.remarks,
		},
	};
	db_connect.collection("discount").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
discountRoutes.route("/discount/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("discount").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = discountRoutes;
