const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const discountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
discountRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("discount")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// join item and discount
discountRoutes.route("/itemdiscount").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("discount")
		// .find({})
		.aggregate([
			{ $lookup: 
				{ 
					from: "item", 
					localField: "itemID", 
					foreignField: "_id", 
					as: "item" 
				} 
			},
		])
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
discountRoutes.route("/discount/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("discount").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
discountRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		itemid: req.body.itemid,
		itemname: req.body.itemname,
		itemtype: req.body.itemtype,
		brand: req.body.brand,
		price: req.body.price,
		imgurl: req.body.imgurl,
		discount: req.body.discount,
	};
	db_connect.collection("discount").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
discountRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			itemID: req.body.itemID,
			precentage: req.body.precentage,
			remarks: req.body.remarks,
		},
	};
	db_connect.collection("discount").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
discountRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("discount").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

//search by itemname
discountRoutes.route("/search/:key").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = { itemname: { $regex: key, $options: "i" } };
	db_connect
		.collection("discount")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get new5 discounts
discountRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("discount")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

module.exports = discountRoutes;
