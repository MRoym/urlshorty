var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;

var urlSchema = new mongoose.Schema({long_url: String,
                                    extension: String});

var urlModel = mongoose.model("URL Model", urlSchema);


app.get("/", function(request, response){
  response.send("Home page!");
})

app.get("/url/*", function(request, response){

  mongoose.connect(mongo_url, function(err, result){
    if (err){
      console.log(err)
    }
    else {
      console.log("Connected to " + mongo_url);
    }
  });

  var url = request.params[0];
  var query = urlModel.find({long_url: url});

  query.exec(function(err, doc){
    if (err){
      console.log(err)
    }
    else {
      var extension = function(){

        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXY1234567890";
        var ext = "";
        for (var i = 0; i < 4; i ++){
          ext += chars[(Math.random()*chars.length).toFixed(0)]
        }
        return ext;
      }


      var newUrl =  new urlModel({long_url: url,
                                extension: extension})

      newUrl.save(function (err) {if (err) console.log ('Error on save!')});

    }


  });
});



app.listen(port, function(){
  console.log("Listening on port" + port);
});
