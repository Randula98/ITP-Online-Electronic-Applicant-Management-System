const { MongoClient } = require('mongodb');
require("dotenv").config({ path: "./.env" });

const url = process.env.ATLAS_URI;
const frontend = new MongoClient(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

var _db;

module.exports = {
    connectToServer: function(callback) {
        frontend.connect(function(err , db){
            //verify the db object
            if(db){
                _db = db.db("synthetic")
                console.log("Successfully connected to MongoDB")
            }
        })
    },

    getDb : function(){
        return _db;
    }
};