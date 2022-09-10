const express = require("express");

// recordRoutes is a instance

const recordRoutes = express.Router();

const dbo = require("../../db/conn");

const ObjectId = require("mongodb").ObjectId;

pre -
	orderRoutes.route("/pre-order").get(function (req, res) {
		let db_connect = dbo.getDb("synthetic");
		db_connect
			.collection("pre-order")
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				res.json(result);
			});
	});

pre -
	orderRoutes.route("/pre-order/:id").get(function (req, res) {
		let db_connect = dbo.getDb("synthetic");
		let myquery = { _id: ObjectId(req.params.id) };
		db_connect.collection("pre-order").findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

pre -
	orderRoutes.route("/pre-order/add").post(function (req, response) {
		let db_connect = dbo.getDb("synthetic");
		let myobj = {
			itemid: req.body.itemid,
			supplierid: req.body.supplierid,
			date: req.body.date,
			quantity: req.body.quantity,
		};
		db_connect.collection("pre-order").insertOne(myobj, function (err, res) {
			if (err) throw err;
			response.json(res);
		});
	});

pre -
	orderRoutes.route("/pre-order/update/:id").post(function (req, response) {
		let db_connect = dbo.getDb("synthetic");
		let myquery = { _id: ObjectId(req.params.id) };
		let newvalues = {
			$set: {
				itemid: req.body.itemid,
				supplierid: req.body.supplierid,
				date: req.body.date,
				quantity: req.body.quantity,
			},
		};
		db_connect.collection("pre-order").updateOne(myquery, newvalues, function (err, res) {
			if (err) throw err;
			response.json(res);
		});
	});

pre -
	orderRoutes.route("/pre-order/delete/:id").delete((req, response) => {
		let db_connect = dbo.getDb("synthetic");
		let myquery = { _id: ObjectId(req.params.id) };
		db_connect.collection("pre-order").deleteOne(myquery, function (err, obj) {
			if (err) throw err;
			console.log("1 document deleted");
			response.json(obj);
		});
	});

module.exports = pre - orderRoutes;
