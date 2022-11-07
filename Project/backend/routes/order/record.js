const express = require("express");
const orderRoutes = express.Router();
const dbo = require("../../db/conn");
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

orderRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("order")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

orderRoutes.route("/order/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("order").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

orderRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		date: fulldate,
		itemid: req.body.itemid,
		brand: req.body.brand,
		itemname: req.body.itemname,
		itemtype: req.body.itemtype,
		unitprice: req.body.unitprice,
		quantity: req.body.quantity,
		status: "pending",
	};
	db_connect.collection("order").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//get pending orders
orderRoutes.route("/pendingorders").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("order")
		.find({ status: "pending" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//set status to accepted and date to full date
orderRoutes.route("/accept/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "accepted", date: fulldate } };
	db_connect.collection("order").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	}
	);
});

//get accepted orders
orderRoutes.route("/accepted").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("order")
		.find({ status: "accepted" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//set status to sent and date to full date
orderRoutes.route("/sent/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "sent", date: fulldate } };
	db_connect.collection("order").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	}
	);
});

//get sent orders
orderRoutes.route("/sent").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("order")
		.find({ status: "sent" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//set status to recieved and date to full date
orderRoutes.route("/recieved/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "recieved", date: fulldate } };
	db_connect.collection("order").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	}
	);
});

//get recieved orders
orderRoutes.route("/recieved").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("order")
		.find({ status: "recieved" })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

orderRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			supplierid: req.body.supplierid,
			date: req.body.date,
			itemid: req.body.itemid,
			quantity: req.body.quantity,
			approvedstatus: req.body.approvedstatus,
			orderstatus: req.body.orderstatus,
			details: req.body.details,
		},
	};
	db_connect.collection("order").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

orderRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("order").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = orderRoutes;
