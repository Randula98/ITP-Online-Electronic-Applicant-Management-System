const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const promotionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
promotionRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("promotion")
		.find({})
		.sort({ _id: -1 })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//new 3 promos
promotionRoutes.route("/new3").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("promotion")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
promotionRoutes.route("/getRecordByID/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("promotion").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
promotionRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		promoname: req.body.promoname,
		precentage: req.body.precentage,
		promoprice: req.body.promoprice,
		imgurl: req.body.imgurl,
		startdate: new Date(req.body.startdate),
		enddate: new Date(req.body.enddate),
	};
	db_connect.collection("promotion").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
promotionRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			promoname: req.body.promoname,
			precentage: req.body.precentage,
			promoprice: req.body.promoprice,
			imgurl: req.body.imgurl,
			startdate: req.body.startdate,
			enddate: req.body.enddate,
		},
	};
	db_connect.collection("promotion").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
promotionRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("promotion").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});


//filter data between specific daterange
promotionRoutes.route("/getHistory/:startDate/:endDate").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { $and: [{ startdate: { $gte: new Date(req.params.startDate) } }, { enddate: { $lte: new Date(req.params.endDate) } }] };
	db_connect.collection("promotion").find(myquery).sort({ _id: -1 })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});
module.exports = promotionRoutes;
