const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const loyaltyRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
loyaltyRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("loyalty")
		.find({})
		.sort({ discount: 1 })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
loyaltyRoutes.route("/loyalty/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("loyalty").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

//get record by type
loyaltyRoutes.route("/getloyalty/:type").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { type: req.params.type };
	db_connect.collection("loyalty").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
loyaltyRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		type: req.body.type,
		discount: Number(req.body.discount),
		payments: Number(req.body.payments),
	};
	db_connect.collection("loyalty").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
loyaltyRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			type: req.body.type,
			discount: Number(req.body.discount),
			payments: Number(req.body.payments),
		},
	};
	db_connect.collection("loyalty").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
loyaltyRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("loyalty").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

// get the relevant loyalty type
loyaltyRoutes.route("/getLoyaltyType/:payments").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	//let myquery = { payments: { $lt: Number(req.params.payments) } };
	// db_connect
	// 	.collection("loyalty")
	// 	.findOne(myquery, function (err, result) {
	// 		if (err) throw err;
	// 		res.json(result);
	// 	});
	let number = Number(req.params.payments);

	db_connect
		.collection("loyalty")
		.find({ payments: { $lte: number } })
		.sort({ payments: -1 })
		.limit(1)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		}
	);

});
module.exports = loyaltyRoutes;
