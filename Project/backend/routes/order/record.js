const express = require("express");
const orderRoutes = express.Router();
const dbo = require("../../db/conn");
const ObjectId = require("mongodb").ObjectId;

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
		supplierid: req.body.supplierid,
		date: req.body.date,
		itemid: req.body.itemid,
		quantity: req.body.quantity,
		aprrovedstatus: req.body.approvedstatus,
		orderstatus: req.body.orderstatus,
		details: req.body.details,
	};
	db_connect.collection("order").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

orderRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			supplierid: req.body.supplierid,
			date: req.body.date,
			aprrovedstatus: req.body.approvedstatus,
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
