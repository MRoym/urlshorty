var express = require("express");
var mongo = require("mongodb");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;
var mongoClient = mongo.MongoClient

app.get("/url/:url", function(request, response){
  var url = request.params.url;
  console.log("Receiving request");

  mongoClient.connect(mongo_url, function(err, db){
    if (err){
      console.log(err);
      response.statuvas(404).send("Error processing request");
    }
    else{

      var collection = db.collection("urls");
      var exists = true;
      var randNum;
      while (exists){
        randNum = Math.round(Math.random()*10000)

        collection.find({extension: randNum}).toArra(function(err, doc){
          if (docs.length==0){
            exists = false;
          }
        });
      }

      var shorter = {long_url: url, extension randNum};

      collection.insert(shorter, function(err, docs){
        if (err){
          console.log(err);
        }
        else {
          console.log("Inserted new short url")
        }
        db.close();
      });

    }

  });

});


app.listen(port, function(){
  console.log("Listening on port" + port);
});
