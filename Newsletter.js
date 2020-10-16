//jshint esversion:6

const express = require("express");
const request =  require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/b8e90b9e6e";
  const options = {
    method: "post",
    auth: "caspar:b8de7b4f662d7de0ad061776133ce1c4-us2"
  };

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.post("/success", function(req, res){


})







app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})

//unique list id: b8e90b9e6e
//b8de7b4f662d7de0ad061776133ce1c4-us2
