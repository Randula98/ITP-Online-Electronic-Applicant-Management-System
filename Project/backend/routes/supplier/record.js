const express = require("express");

// recordRoutes is a instance

const supplierRoutes = express.Router();

const dbo = require("../../db/conn");

const ObjectId = require("mongodb").ObjectId;

supplierRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("supplier")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//new 5 supplier
supplierRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("supplier")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

supplierRoutes.route("/supplier/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("supplier").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

supplierRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		//supplierid: req.body.supplierid,
		supplierfname: req.body.supplierfname.supplierfname,
		supplierlname: req.body.supplierlname.supplierlname,
		street: req.body.street.street,
		city: req.body.city.city,
		province: req.body.province.province,
		contactnumber: req.body.contactnumber.contactnumber,
		email: req.body.email.email,
		imgurl: req.body.imgurl,
	};
	db_connect.collection("supplier").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

supplierRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			//supplierid: req.body.supplierid,
			supplierfname: req.body.supplierfname,
			supplierlname: req.body.supplierlname,
			street: req.body.street,
			city: req.body.city,
			province: req.body.province,
			contactnumber: req.body.contactnumber,
			email: req.body.email,
			imgurl: req.body.imgurl,
		},
	};
	db_connect.collection("supplier").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

supplierRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("supplier").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

//search by supplierfname
supplierRoutes.route("/search/:key").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = { supplierfname: { $regex: key, $options: "i" } };
	db_connect
		.collection("supplier")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

module.exports = supplierRoutes;
