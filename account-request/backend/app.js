const express = require("express");
const cors = require("cors");
const userRoute = require('./routes/usersRequestRouter')

const app = express();

app.use(express());
app.use(cors());
app.use(express.json());
app.set("view engine","ejs");

app.use("/user-requests",userRoute);

app.use((req,res) => {
    res.status(404).render("404");
})

module.exports = app;