const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const repairRoutes = express.Router();

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
repairRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("repair")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

repairRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("repair")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
repairRoutes.route("/repair/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("repair").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// serach by itemname
repairRoutes.route("/search/:key").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = { itemname: { $regex: key, $options: "i" } };
	db_connect
		.collection("repair")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you create a new record.
repairRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		customerid: req.body.customerid,
		repairdate: fulldate,
		itemname: req.body.itemname,
		description: req.body.description,
		imgurl: req.body.imgurl,
		status: "pending",
	};
	db_connect.collection("repair").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// get all pending repairs
repairRoutes.route("/pending").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("repair")
		.find({ status: "pending" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get all pending repairs by customerid
repairRoutes.route("/pending/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id , status: "pending"};
	db_connect
		.collection("repair")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get all accepted repairs by customerid
repairRoutes.route("/accepted/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id , status: "accepted"};
	db_connect
		.collection("repair")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get all completed repairs by customerid
repairRoutes.route("/completed/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id , status: "completed"};
	db_connect
		.collection("repair")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get status to accepted and update date
repairRoutes.route("/accept/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			status: "accepted",
			repairdate: fulldate,
		},
	};
	db_connect
		.collection("repair")
		.updateOne(myquery, newvalues, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get all accepted repairs
repairRoutes.route("/accepted").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("repair")
		.find({ status: "accepted" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// set status to completed and update date
repairRoutes.route("/complete/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			status: "completed",
			repairdate: fulldate,
		},
	};
	db_connect
		.collection("repair")
		.updateOne(myquery, newvalues, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get all completed repairs
repairRoutes.route("/completed").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("repair")
		.find({ status: "completed" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you update a record by id.
repairRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			itemname: req.body.itemname,
			description: req.body.description,
			imgurl: req.body.imgurl,
		},
	};
	db_connect.collection("repair").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
repairRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("repair").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});
module.exports = repairRoutes;
