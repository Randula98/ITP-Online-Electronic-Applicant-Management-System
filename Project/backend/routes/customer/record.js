const express = require("express");
let alert = require("alert");
const jwt = require("jsonwebtoken");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const customerRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
customerRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("customer")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//new 5 customers
customerRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("customer")
		.find({})
		.sort({ _id: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//top 5 customers
customerRoutes.route("/top5").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("customer")
		.find({})
		.sort({ totalpayments: -1 })
		.limit(5)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

//top 10 customers
customerRoutes.route("/top10").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	db_connect
		.collection("customer")
		.find({})
		.sort({ totalpayments: -1 })
		.limit(10)
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});



// This section will help you get a single record by id
customerRoutes.route("/customer/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	.collection("customer")
	.findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

customerRoutes.route("/email/:id").get(function (req, res) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { email: req.params.id };
	db_connect
		.collection("customer")
		.findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help you create a new record.
customerRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");

	// let email = req.body.email.email;
	let myquery = { email: req.body.email.email };
	db_connect.collection("customer").findOne(myquery, function (err, result) {
		if (err) throw err;
		if (result) {
			console.log("Email already exists");
			console.log(req.body.email.email);
			return response.status(400).json({ success: false, msg: "Email already exists" , found: "email" });
		} else {
			let myquery = { contactno: req.body.contactno.contactno };
			db_connect.collection("customer").findOne(myquery, function (err, result) {
				if (err) throw err;
				if (result) {
					console.log("Contact No already exists");
					console.log(req.body.contactno.contactno);
					return response.status(400).json({ success: false, msg: "Contact No already exists" , found: "contact" });
				} else {
					let myobj = {
						fname: req.body.fname.fname,
						lname: req.body.lname.lname,
						address: req.body.address.address,
						contactno: req.body.contactno.contactno,
						email: req.body.email.email,
						password: req.body.password.password,
						totalpurchases: 0,
						totalpayments: 0,
						imgurl: req.body.imgurl,
						loyaltylevel: "0",
					};
					console.log(req.body.imgurl);
					db_connect.collection("customer").insertOne(myobj, function (err, res) {
						if (err) throw err;
						console.log("1 document inserted");
						return response.status(400).json({ success: true, msg: "1 document inserted" });
					});
				}
			});
		}
	});
});

// This section will help you update a record by id.
customerRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");

	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			fname: req.body.fname,
			lname: req.body.lname,
			address: req.body.address,
			contactno: req.body.contactno,
			email: req.body.email,
			imgurl: req.body.imgurl,
		},
	};
	db_connect.collection("customer").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// update customers total purchases and payments
customerRoutes.route("/updatepurchases/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id)};

	let newpurchases = Number(req.body.purchases);
	let newpayments = Number(req.body.payments);
	console.log(newpurchases);
	console.log(newpayments);

	let newvalues = {
		$set: {
			totalpurchases: newpurchases,
			totalpayments: newpayments,
		},
	};
	db_connect.collection("customer").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	}
	);
});

// update customer loyalty level
customerRoutes.route("/updatelevel/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			loyaltylevel: req.body.loyaltylevel,
		},
	};
	db_connect.collection("customer").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	}
	);
});

//update customer password 
customerRoutes.route("/updatepassword/:id").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			password: req.body.password,
		},
	};
	db_connect.collection("customer").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	}
	);
});

// This section will help you delete a record
customerRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("synthetic");
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("customer").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

// login
customerRoutes.route("/login").post(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let email = req.body.email;
	let password = req.body.password;

	db_connect.collection("customer").findOne({ email: email, password: password }, function (err, result) {
		if (err) throw err;
		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
					fname: result.fname,
					lname: result.lname,
					address: result.address,
					contactno: result.contactno,
					email: result.email,
					password: result.password,
					totalpurchases: result.totalpurchases,
					totalpayments: result.totalpayments,
					imgurl: result.imgurl,
					loyaltylevel: result.loyaltylevel,
				},
				"secretkey"
			);

			return response.json({ user: true, msg: "Login Success", status: "ok", token: token });
		} else {
			return response.json({ user: false, msg: "Login Failed", status: "error" });
		}
	});
});

// search by fname
customerRoutes.route("/search/:key").get(function (req, response) {
	let db_connect = dbo.getDb("synthetic");
	let key = req.params.key;
	let myquery = { fname: { $regex: key, $options: "i" } };
	db_connect.collection("customer").find(myquery).toArray(function (err, result) {
		if (err) throw err;
		response.json(result);
	});
});

module.exports = customerRoutes;
