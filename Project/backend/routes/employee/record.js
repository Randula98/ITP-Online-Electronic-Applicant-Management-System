const express = require("express");

const jwt = require("jsonwebtoken");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const employeeRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
employeeRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("employee")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//new emp
employeeRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("employee")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//top emp
employeeRoutes.route("/top5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("employee")
		.find({})
		.sort({ totalservices: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//set employee position
employeeRoutes.route("/setposition/:id").post(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			position: req.body.position,
		},
	};
	db_connect
		.collection("employee")
		.updateOne(myquery, newvalues, function (err, result) {
			if (err) throw err;
			res.json("1 document updated");
		});
});

// This section will help you get a single record by id
employeeRoutes.route("/employee/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("employee").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
employeeRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");

	let myquery = { email: req.body.email.email };
	db_connect.collection("employee").findOne(myquery, function (err, result) {
		if (err) throw err;
		if (result) {
			return response.status(400).json({ success: false, msg: "Email already exists" , found: "email" });
		} else {
			let myquery = { contact: req.body.contact.contact };
			db_connect.collection("employee").findOne(myquery, function (err, result) {
				if (err) throw err;
				if (result) {
					return response.status(400).json({ success: false, msg: "Contact No already exists" , found: "contact" });
				} else {
					let myobj = {
						fname: req.body.fname.fname,
						lname: req.body.lname.lname,
						contact: req.body.contact.contact,
						position: "new",
						email: req.body.email.email,
						password: req.body.password.password,
						imgurl: req.body.imgurl,
						totalsales: 0,
						totalappoinments: 0,
						totalservices: 0,
					};
					db_connect.collection("employee").insertOne(myobj, function (err, res) {
						if (err) throw err;
						return response.status(400).json({ success: true, msg: "1 document inserted" });
					});
				}
			});
		}
	});
});

// This section will help you update a record by id.
employeeRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			fname: req.body.fname,
			lname: req.body.lname,
			contact: req.body.contact,
			position: req.body.position,
			email: req.body.email,
			//password: req.body.password,
			imgurl: req.body.imgurl,
			//totalsales: req.body.totalsales,
			//totalappoinments: req.body.totalappoinments,
			totalservices: req.body.totalservices,
		},
	};
	db_connect.collection("employee").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//update password
employeeRoutes.route("/updatepassword/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			password: req.body.password,
		},
	};
	db_connect.collection("employee").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//update position
employeeRoutes.route("/updateposition/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			position: req.body.position,
		},
	};
	db_connect.collection("employee").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});	

// This section will help you delete a record
employeeRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("employee").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

employeeRoutes.route("/login").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let email = req.body.email;
	let password = req.body.password;

	db_connect.collection("employee").findOne({ email: email, password: password }, function (err, result) {
		if (err) throw err;
		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
					fname: result.fname,
					lname: result.lname,
					contact: result.contact,
					position: result.position,
					email: result.email,
					password: result.password,
					imgurl: result.imgurl,
					totalsales: result.totalsales,
					totalappoinments: result.totalappoinments,
					totalservices: result.totalservices,
				},
				"secretkey"
			);

			return response.json({ user: true, msg: "Login Success", status: "ok", token: token });
		} else {
			return response.json({ user: false, msg: "Login Failed", status: "error", email: email, password: password });
		}
	});
});

//search employee by fname
employeeRoutes.route("/search/:key").get(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let query = { fname: { $regex: key, $options: "i" } };
	db_connect.collection("employee").find(query).toArray(function (err, result) {
		if (err) throw err;
		response.json(result);
	});
});

module.exports = employeeRoutes;
