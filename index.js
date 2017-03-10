var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;
var mongoClient = mongo.MongoClient

var urlSchema = new mongoose.Schema({long_url: String,
                                    extension: Number});

var urlModel = mongoose.model("URL Model", urlSchema);


app.get("/", function(request, response){
  response.send("Home page!");
})

app.get("/url/:url", function(request, response){

  response.send(request.params.url);
});



app.listen(port, function(){
  console.log("Listening on port" + port);
});
