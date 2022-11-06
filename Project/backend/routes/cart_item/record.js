const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("cart_item")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
recordRoutes.route("/cart_item/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("cart_item").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

//get record by cartid
recordRoutes.route("/cart/:cartid").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { cartid: req.params.cartid };
	db_connect
		.collection("cart_item")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you create a new record.
recordRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		cartid: req.body.cartid,
		itemid: req.body.itemid,
		brand: req.body.brand,
		itemname: req.body.itemname,
		itemtype: req.body.itemtype,
		unitprice: Number(req.body.unitprice),
		quantity: Number(req.body.quantity),
	};
	db_connect.collection("cart_item").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// get items by cart id
recordRoutes.route("/getitems/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { cartid: req.params.id };
	db_connect
		.collection("cart_item")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			cartid: req.body.cartid,
			itemid: req.body.itemid,
			brand: req.body.brand,
			itemname: req.body.itemname,
			itemtype: req.body.itemtype,
			unitprice: Number(req.body.unitprice),
			quantity: Number(req.body.quantity),
		},
	};
	db_connect.collection("cart-item").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
recordRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("cart_item").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = recordRoutes;
