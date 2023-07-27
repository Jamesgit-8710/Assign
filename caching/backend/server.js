const express = require("express");
const app = express();
const cacheService = require("express-api-cache");
const cache = cacheService.cache;
var cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["js"],

    // Cookie Options
    maxAge: 10000, // 24 hours
  })
);

app.get("/createSession", async (req, res) => {
  if (req.session.check) 
    res.status(200).send("Session already created!");
  else {
    req.session.check = true;
    res.status(200).send("New session created!");
  }
});

app.get("/checkSession", async (req, res) => {
  if (req.session.check) res.status(200).send(true);
  else res.status(200).send(false);
});

app.get("/data", cache("10 minutes"), async (req, res) => {
  // Do some work to retrieve data and request before 10 minutes will get movies from cache
  const apiResponse = await fetch("https://dummyjson.com/product");
  const json = await apiResponse.json();
  //   console.log(json.products[0].id);
  //   console.log("sdfsdfsd111")
  res.status(200).send(json);
});

app.listen(8000, function () {
  console.log(`I'm running on port 8000`);
});
