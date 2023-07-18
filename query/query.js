const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const map = require("./map.json");

const app = express();

app.use(cors());
app.use(express.json());

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://james1131:RoL5SGKyU4L3U6Zx@cluster0.ko8ydnw.mongodb.net/query"
  );
};

main().catch((err) => console.log("ERROR: ", err));

const apiSchema = new mongoose.Schema({
  title: String,
  des: String,
  price: Number,
  discount: Number,
  rating: Number,
  stock: Number,
  brand: String,
  cat: String,
  thumnail: String,
  imgs: Array,
});

const api = mongoose.model("api", apiSchema);

app.get("/run", async (req, res) => {
  //   const url = "https://dummyjson.com/product";

  //   const f = await fetch(url);

  //   const data = await f.json();

  //   data.products.forEach(element => {
  //     const temp = new api();
  //     console.log(element.id)
  //     temp.title=element.title;
  //     temp.des=element.description;
  //     temp.price=element.price;
  //     temp.discount=element.discountPercentage;
  //     temp.rating=element.rating;
  //     temp.stock=element.stock;
  //     temp.brand=element.brand;
  //     temp.cat=element.category;
  //     temp.thumnail=element.thumnail;
  //     temp.imgs=element.images;

  //     temp.save();
  //   });

  api.updateOne({}).then((result) => {
    console.log("------->", result);
    // result.forEach(element => {
    //     if(element.price>30)
    //     console.log(element)
    // });
  });

  res.status(200).send("Running...");
});

const aSchema = new mongoose.Schema({
  name: String,
  location: Object
});

const a = mongoose.model("a", aSchema);

app.get("/fetch", async (req, res) => {
  //   find({
  //     location: {
  //       $near: [req.body.long, req.body.lat],
  //       $maxDistance: req.body.km / 6371,
  //     },
  //   });

  a.find({
    location: {
      $geonear: {$geometry: {type: 'Point',coordinates:[76.74404943674983, 30.68066949115736]}},
    },
  }).then((result) => {
    console.log(result);
  })

//   map.forEach(element => {
//       const temp = new a();
//       //   console.log(element.id)
//         temp.name=element.name;
//         temp.location=element.location;

//         temp.save();
//   })

  res.send("working...");
});

app.listen(8000, () => {
  console.log("I'm running on port 8000");
});
