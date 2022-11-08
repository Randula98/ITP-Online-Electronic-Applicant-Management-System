
const express = require("express");



// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const loanRoutes = express.Router();

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
loanRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("loan")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get pending loans
loanRoutes.route("/pendingloans").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("loan")
		.find({ status: "pending" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get pending loans by employeeid
loanRoutes.route("/pendingloans/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { employeeid: req.params.id, status: "pending" };
	db_connect
		.collection("loan")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get approved loans by employeeid
loanRoutes.route("/approvedloans/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { employeeid: req.params.id, status: "approved" };
	db_connect
		.collection("loan")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get approved loans
loanRoutes.route("/approvedloans").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("loan")
		.find({ status: "approved" })
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

// This section will help you get a single record by id - approved
loanRoutes.route("/loan/pending/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id), status: "pending" };
	db_connect
		.collection("loan")
		.findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id - approved
loanRoutes.route("/loan/approved/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id), status: "approved" };
	db_connect
		.collection("loan")
		.findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you create a new record.
loanRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");

	let myobj = {
		loandate: fulldate,
		duedate: req.body.duedate,
		amount: req.body.amount,
		duration: req.body.duration,
		loanpurpose: req.body.loanpurpose,
		employeeid: req.body.employeeid,
		status: "pending",
	};
	db_connect.collection("loan").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
loanRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			loandate: req.body.loandate,
			duedate: req.body.duedate,
			amount: req.body.amount,
			duration: req.body.duration,
			loanpurpose: req.body.loanpurpose,
			employeeid: req.body.employeeid,
			status: "approved",
		},
	};
	db_connect.collection("loan").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//update as approved
loanRoutes.route("/approve/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			loandate: fulldate,
			status: "approved",
		},
	};
	db_connect.collection("loan").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
loanRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("loan").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

//search loan by purpose
loanRoutes.route("/search/:key").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = { loanpurpose: { $regex: key, $options: "i" } };
	db_connect
		.collection("loan")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

module.exports = loanRoutes;
