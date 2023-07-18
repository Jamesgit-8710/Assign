const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://james1131:RoL5SGKyU4L3U6Zx@cluster0.ko8ydnw.mongodb.net/zenstore"
  );

  console.log("connected!");
};

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  prof: String,
});

const users = mongoose.model("users", userSchema);

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
});

const products = mongoose.model("products", productSchema);

main().catch((err) => console.log("ERROR: ", err));

app.post("/prod", (req, res) => {
  const temp = req.body;

  const prod = new products();
  prod.title = temp.t;
  prod.price = temp.p;
  prod.image = temp.i;

  prod.save();
});

app.post("/signUp", (req, res) => {
  const temp = req.body;

  const us = new users();
  us.username = temp.u;
  us.password = temp.p;
  us.prof = temp.prof;

  us.save();
});

app.post("/fetch", async(req, res) => {

    await products.find().then((result) => {
        res.send(result)
        // result.forEach((element) => {
        //     console.log(element.title)
        // })
    })


});

app.post("/signIn", async (req, res) => {
  const temp = req.body;

  console.log(temp);

  let i = 0;

  await users.find().then((result) => {
    // console.log("----------------> ", result);
    result.forEach((element) => {
      if (
        element.username == req.body.u &&
        element.password == req.body.p &&
        element.prof == req.body.prof
      ) {
        i = 1;
        return;
      }
    });
  });

  if (i) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(8000, () => {
  console.log(`I'm running on port ${8000}`);
});
