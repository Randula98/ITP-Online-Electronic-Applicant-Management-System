const express = require("express");
let alert = require("alert");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const customerRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
customerRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("customer")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
customerRoutes.route("/customer/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("customer").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
customerRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	// if (db_connect.collection("customer").findOne({ email: req.body.email })) {
	// 	console.log("Email already exists");
	// 	console.log(req.body.email);
	// 	return response.status(400).json({ success: false, msg: "Email already exists" });
	// 	//window.alert("message");
	// }

	let myobj = {
		fname: req.body.fname,
		lname: req.body.lname,
		address: req.body.address,
		contactno: req.body.contactno,
		email: req.body.email,
		password: req.body.password,
		totalpurchases: 0,
		totalpayments: 0,
		imgurl: req.body.imgurl,
	};
	console.log(req.body.imgurl);
	db_connect.collection("customer").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
customerRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			fname: req.body.fname,
			lname: req.body.lname,
			address: req.body.address,
			contactno: req.body.contactno,
			email: req.body.email,
			password: req.body.password,
			totalpurchases: req.body.totalpurchases,
			totalpayments: req.body.totalpayments,
			imgurl: req.body.imgurl,
		},
	};
	db_connect.collection("customer").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
customerRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("customer").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = customerRoutes;
