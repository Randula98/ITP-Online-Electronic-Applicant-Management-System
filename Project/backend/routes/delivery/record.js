const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const deliveryRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
deliveryRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("delivery")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
deliveryRoutes.route("/delivery/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("delivery").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
deliveryRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		// name: req.body.name,
		// position: req.body.position,
		// level: req.body.level,
		itemid: req.body.itemid,
		stars: req.body.stars,
		remarks: req.body.remarks,
		customerid: req.body.customerid,
		date: req.body.date,
	};
	db_connect.collection("delivery").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
deliveryRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			// name: req.body.name,
			// position: req.body.position,
			// level: req.body.level,
			itemid: req.body.itemid,
			stars: req.body.stars,
			remarks: req.body.remarks,
			customerid: req.body.customerid,
			date: req.body.date,
		},
	};
	db_connect.collection("delivery").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
deliveryRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("delivery").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});
module.exports = deliveryRoutes;
