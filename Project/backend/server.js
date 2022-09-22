const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.REACT_APP_BACKEND_PORT || 5000;
app.use(cors());
app.use(express.json());

//get routes
app.use("/employee", require("./routes/employee/record"));
app.use("/position", require("./routes/position/record"));

app.use("/cart", require("./routes/cart/record"));
app.use("/cart_item", require("./routes/cart_item/record"));

app.use("/targets", require("./routes/targets/record"));
app.use("/discount", require("./routes/discount/record"));
app.use("/promotion", require("./routes/promotion/record"));

app.use("/item", require("./routes/item/record"));
app.use("/itemtype", require("./routes/itemtype/record"));
app.use("/brand", require("./routes/brand/record"));

app.use("/customer", require("./routes/customer/record"));
app.use("/loyalty", require("./routes/loyalty/record"));

app.use("/supplier_ranking", require("./routes/supplier_ranking/record"));
app.use("/supplier", require("./routes/supplier/record"));
app.use("/order", require("./routes/order/record"));
app.use("/pre_order", require("./routes/pre_order/record"));

app.use("/loan", require("./routes/loan/record"));
app.use("/payment", require("./routes/payment/record"));

app.use("/rating", require("./routes/rating/record"));
app.use("/repair", require("./routes/repair/record"));
app.use("/delivery", require("./routes/delivery/record"));

//get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
	//perform connection to database
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log("................");
	console.log(`Server started on port ${port}`);
});
