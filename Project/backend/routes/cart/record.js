const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

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
recordRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("cart")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
recordRoutes.route("/cart/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("cart").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
recordRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myobj = {
		customerid: req.body.customerid,
		customername: req.body.customername,
		cartid: req.body.cartid,
		placeddate: fulldate,
		totalprice: req.body.totalprice,
		status: "pending",
	};
	db_connect.collection("cart").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//change record status to accepted
recordRoutes.route("/accept/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "accepted" } };
	db_connect.collection("cart")
		.updateOne(myquery, newvalues, function (
			err,
			result
		) {
			if (err) throw err;
			res.json(result);
		}
		);
});

//change record status to sent to delivery
recordRoutes.route("/send/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "sent to delivery" } };
	db_connect.collection("cart").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	}
	);
});

//get penting records
recordRoutes.route("/pending").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { status: "pending" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// get pending records by customer id
recordRoutes.route("/pending/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id, status: "pending" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get accepted records
recordRoutes.route("/accepted").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { status: "accepted" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get accepted records by customer id
recordRoutes.route("/accepted/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id, status: "accepted" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get sent to delivery records
recordRoutes.route("/sent").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { status: "sent to delivery" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get sent to delivery records by customer id
recordRoutes.route("/sent/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id, status: "sent to delivery" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get top 5 purchases by totalprice
recordRoutes.route("/top5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("cart")
		.find({})
		.sort({ totalprice: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get delivered records
recordRoutes.route("/delivered").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { status: "delivered" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//get delivered records by customer id
recordRoutes.route("/delivered/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { customerid: req.params.id, status: "delivered" };
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});


// change status to delivered
recordRoutes.route("/delivered/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "delivered" } };
	db_connect.collection("cart").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	});
});

//search delivered records by customer name
recordRoutes.route("/delivered/search/:key").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = {
		status: "delivered",
		$or: [
			{ customername: { $regex: key, $options: "i" } },
			{ customerid: { $regex: key, $options: "i" } },
		],
	};
	db_connect
		.collection("cart")
		.find(myquery)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// change status to completed
recordRoutes.route("/completed/:id").put(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { status: "completed" } };
	db_connect.collection("cart").updateOne(myquery, newvalues, function (
		err,
		result
	) {
		if (err) throw err;
		res.json(result);
	}
	);
});

//get completed records
recordRoutes.route("/completed").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { status: "completed" };
	db_connect
		.collection("cart")
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
			customerId: req.body.customerId,
			noOfItems: req.body.noOfItems,
			totalPrice: req.body.totalPrice,
		},
	};
	db_connect.collection("cart").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// This section will help you delete a record
recordRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("cart").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = recordRoutes;
