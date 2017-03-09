var express = require("express");
var mongo = require("mongodb");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;
var mongoClient = mongo.MongoClient

app.post("/url/:url", function(request, response){
  var url = request.params.url;
  console.log("Receiving request");

  mongoClient.connect(mongo_url, function(err, db){
    if (err){
      console.log(err);
      response.status(404).send("Error processing request");
    }
    else{

      var collection = db.collection("urls");

      var exists = true;
      var randNum = Math.round(Math.random()*10000);
      /**
      while (exists){
        collection.find({extension: randNum}).toArray(function(err, doc){
          randNum = Math.round(Math.random()*10000)
          console.log(randNum);
          console.log(doc.length);

          if (doc.length==0){
            exists = false;
            console.log("Unique key " + randNum);
          }
          });
      }
      */

      var shorter = {long_url: url, extension: randNum};

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
  response.send("Done.");

});


app.get("/go/:ext", function(request, response){

  var ext = request.params.ext;
  var redirectURL;
  console.log("Working...");
  mongoClient.connect(mongo_url, function(err, db){
    if (err){
      console.log(err);
    }
    var collection = db.collection("urls");

    collection.find({extension: ext}).toArray(function(err, doc){

      redirectURL = doc.long_url;
      db.close()
    });

  });
  response.redirect(redirectURL);

});


app.listen(port, function(){
  console.log("Listening on port" + port);
});
