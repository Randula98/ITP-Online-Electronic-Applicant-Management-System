const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const paymentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//get date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
let fulldate = year + "-" + month + "-" + date;
console.log(fulldate);

// This section will help you get a list of all the records.
paymentRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("payment")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
paymentRoutes.route("/payment/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("payment").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
paymentRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		date: fulldate,
		amount: Number(req.body.amount),
		name: req.body.name,
		email: req.body.email,
		contactno: req.body.contactno,
		purpose: req.body.purpose,
	};
	db_connect.collection("payment").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
paymentRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			date: fulldate,
			amount: Number(req.body.amount),
			name: req.body.name,
			email: req.body.email,
			contactno: req.body.contactno,
			purpose: req.body.purpose,
		},
	};
	db_connect.collection("payment").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
paymentRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("payment").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

//get latest 5 records
paymentRoutes.route("/latest").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("payment")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});


//decending order by amount
paymentRoutes.route("/amount").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("payment")
		.find({})
		.sort({ amount: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});


module.exports = paymentRoutes;
