var express = require("express");
var mongo = require("mongodb");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;
var mongoClient = mongo.mongoClient

app.get("/:url", function(request, response){
  var url = request.params.url;

  mongoClient.connect(mongo_url, function(err, db){
    if (err){
      console.log(err);
      response.status(404).send("Error processing request");
    }
    else{

      var collection = db.collection("urls");
      var exists = true;
      var randNum;
      while (exists){
        randNum = Math.round(Math.random()*10000)

        collection.find({short_url: "https://safe-eyrie-53822.herokuapp.com/" + randNum}, function(err, doc){
          if (!docs.length){
            exists = false;
          }
        });
      }

      var shorter = {long_url: url, short_url: "https://safe-eyrie-53822.herokuapp.com/" + randNum};

      collection.insert(shorter, fucntion(err, docs){

        if (err){
          console.log(err);
        }
        else {
          console.log("Inserted new short url")
        }
      });



    }
    db.close();

  });


});


app.listen(port, function(){
  console.log("Listening on port" + port);
});
