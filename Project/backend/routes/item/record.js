const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const itemRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
itemRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("item")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get 5 random items
itemRoutes.route("/random").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("item")
		.aggregate([{ $sample: { size: 9 } }])
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get 5 random items by item type
itemRoutes.route("/random/:itemtype").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("item")
		.aggregate([
			{ $match: { itemtype: req.params.itemtype } },
			{ $sample: { size: 9 } },
		])
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get latest 5 items
itemRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("item")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get items which have stocks less than 10
itemRoutes.route("/low").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("item")
		.find({ unitstock: { $lt: 10 } })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});


// get item by brand
itemRoutes.route("/brand/:brand").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { brand: req.params.brand };
	db_connect
		.collection("item")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get item by itemtype
itemRoutes.route("/itemtype/:itemtype").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { itemtype: req.params.itemtype };
	db_connect
		.collection("item")
		.find(myquery)
		.sort({ itemname: 1 })
		.collation({ locale: "en", caseLevel: true })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get item by brand and itemtype
itemRoutes.route("/brand/:brand/itemtype/:itemtype").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = {
		brand: req.params.brand,
		itemtype: req.params.itemtype,
	};
	db_connect
		.collection("item")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get item count by brand and itemtype
itemRoutes.route("/count/brand/:brand/itemtype/:itemtype").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = {
		brand: req.params.brand,
		itemtype: req.params.itemtype,
	};
	db_connect
		.collection("item")
		.find(myquery)
		.count(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
itemRoutes.route("/item/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
		.collection("item")
		.findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you create a new record.
itemRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myobj = {
		itemname: req.body.itemname.itemname,
		unitprice: Number(req.body.unitprice.unitprice),
		itemtype: req.body.itemtype.itemtype,
		brand: req.body.brand.brand,
		unitstock: Number(req.body.unitstock.unitstock),
		imgurl: req.body.imgurl,
		description: req.body.description.description,
	};
	db_connect.collection("item").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you update a record by id.
itemRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			itemname: req.body.itemname.itemname,
			unitprice: Number(req.body.unitprice.unitprice),
			itemtype: req.body.itemtype.itemtype,
			brand: req.body.brand.brand,
			unitstock: Number(req.body.unitstock.unitstock),
			imgurl: req.body.imgurl,
			description: req.body.description.description,
		},
	};
	db_connect.collection("item").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
itemRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("item").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

// get 9 random items by itemtype
itemRoutes.route("/random/:itemtype").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { itemtype: req.params.itemtype };
	db_connect
		.collection("item")
		.aggregate([{ $match: myquery }, { $sample: { size: 9 } }])
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// search item by itemname
itemRoutes.route("/search/:itemname").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { itemname: { $regex: req.params.itemname, $options: "i" } };
	db_connect
		.collection("item")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

module.exports = itemRoutes;
