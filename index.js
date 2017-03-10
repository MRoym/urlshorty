var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var app = express();
var mongo_url = "mongodb://MRoyM:Kalahari1@ds151078.mlab.com:51078/urls" //process.env.MONGOLAB_URI; //"mongodb://localhost:27017/data" //process.env.MONGOLAB_URI;

var urlSchema = new mongoose.Schema({long_url: String,
                                    extension: String});

var urlModel = mongoose.model("urls", urlSchema);


app.get("/", function(request, response){
  response.send("Home page!");
})

app.get("/url/*", function(request, response){

  var output = {long_url: null, extension:null};

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

      if (doc.length>0){
        output.long_url = url;
        output.extension = doc[0].extension;
        response.json(output);
      }
      else {
      var extension = createExtension();

      var newUrl =  new urlModel({long_url: url,
                                extension: extension})

      newUrl.save(function (err) {if (err) console.log ('Error on save!')});

      output.long_url = url;
      output.extension = extension;

      response.json(output);

      }

      mongoose.connection.close();
    }


  });
});

app.get("/go/:ext", function(request, response){

  var ext = request.params.ext

  mongoose.connect(mongo_url, function(err, res){
    if (err){
      console.log(err)
    }
    else {
      console.log("Connected to " + mongo_url)
    }
  });


  var query = urlModel.find({extension: ext});
  query.exec(function(err, doc){
    if (doc.length > 0){
      response.redirect("https://"+doc[0].long_url);
    }
    else {
      response.json({error: "That extension could not be found in our database"});
    }
  })
  mongoose.connection.close();

});





app.listen(port, function(){
  console.log("Listening on port" + port);
});


function createExtension(){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXY1234567890";
    var ext = "";
    for (var i = 0; i < 4; i ++){
      ext += chars[(Math.random()*chars.length).toFixed(0)]
    }
    return ext;

}
