const express = require('express');
const dotenv = require("dotenv").config()

const app = express();

const port = process.env.PORT || 8001;

app.use("/api/string", require('./routes/page1'));
app.use("/api/json", require('./routes/page2'));
app.use("/api/bool", require('./routes/page3'));

// var fs = require("fs");

// fs.readFile("xyz.json", function(err, buf) {
//   console.log(JSON.parse(buf));
// });

// app.all("*",(req,res)=>{
//     res.status(404).send("Not found")
// })

const fs = require("fs");
  
// STEP 1: Reading JSON file
const users = require("./xyz");
   
// Defining new user
let user = {
    name: "New User",
    age: 30,
    language: ["PHP", "Go", "JavaScript"]
};
   
// STEP 2: Adding new data to users object
users.push(user);
   
// STEP 3: Writing to a file
fs.writeFile("xyz.json", JSON.stringify(users), err => {
     
    // Checking for errors
    if (err) throw err; 
   
    console.log("Done writing"); // Success
});

app.listen(port,()=>{
    console.log(`I'm running on port ${port}`);
});