//jshint esversion:6


const express = require ("express");
const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, Caspar</h1>");
})

app.get("/contact", function(req, res){
  res.send("Contact Email: caspar160423@gmail.com");
})

app.get("/about", function(req, res){
  res.send("Hi, I'm Caspar, a fresh developer to the world, welcome to my first Server!");
})

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Workout</li><li>Coffee</li><li>Programming</li></ul>");
})

app.listen(3000, function(){
  console.log("Server started on port 3000");
})
