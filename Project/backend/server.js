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

//get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    //perform connection to database
    dbo.connectToServer(function (err){
        if (err) console.error(err);
    });
    console.log(`Server started on port ${port}`);
});

 