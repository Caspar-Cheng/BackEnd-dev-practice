//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const items = ["Shopping Food", "Cooking Food", "Learning Online Course"];
const workItems = [];

//to use ejs
app.set('view engine', 'ejs');
//to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//to make public folder recognized by express.js
app.use(express.static("public"));

//get data from webpage
app.get("/", function(req, res){

  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
//javascript toLocaleDateString method to get current date
  let day = today.toLocaleDateString("en-US", options);

// only one render inside one get function, put all variables here to render
  res.render("list", {listTitle: day, newListItems: items});
});

//post the data from webpage to server
app.post("/", function(req, res){

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
})


// set server port and webpage port if have one
app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
