const express = require("express");
const cors = require("cors");
const userRoute = require('./routes/usersRequestRouter')

const app = express();

app.use(express());
app.use(cors());
app.use(express.json());

app.use("/user-requests",userRoute);

module.exports = app;