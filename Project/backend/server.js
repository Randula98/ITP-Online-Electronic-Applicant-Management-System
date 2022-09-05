const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.REACT_APP_BACKEND_PORT || 5000;
app.use(cors());
app.use(express.json());

//get routes

app.use("/target",require("./routes/target/record"));
app.use("/discount",require("./routes/discount/record"));
app.use("/promotion",require("./routes/promotion/record"));

app.use("/item", require("./routes/item/record"));
app.use("/itemtype", require("./routes/itemtype/record"));

app.use("/customer", require("./routes/customer/record"));
app.use("/loyalty", require("./routes/loyalty/record"));


//get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    //perform connection to database
    dbo.connectToServer(function (err){
        if (err) console.error(err);
    });
    console.log("................");
    console.log(`Server started on port ${port}`);
});

