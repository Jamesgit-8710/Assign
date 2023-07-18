const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://james1131:RoL5SGKyU4L3U6Zx@cluster0.ko8ydnw.mongodb.net/whetherapi"
  );

  console.log("connected!");
};

const apiSchema = new mongoose.Schema({
  city: String,
  temp: Number,
});

const apiApi = mongoose.model("apiApi", apiSchema);

main().catch((err) => console.log("ERROR: ", err));

app.post("/api", async (req, res) => {
  const values = req.body.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${values}&appid=d4d24ee6a720a0d8bf830b3ddd8a6ab2`;

  const data = await fetch(url);
  const val = await data.json();

  console.log(val);

  
    apiApi.create({
      city: req.body.city,
      temp: val?.main?.temp,
    });
  

    apiApi.findOne({city: values}).then((result) => {
      console.log("----------------> ",result)
    })

  //   res.send({
  //     city: val.name,
  //     temp: val?.main?.temp,
  //   });

  //   await fetch(url).then(async (response) => {
  //     const data = await response.json();
  //     const values = data.data.timelines[0];

  //     let api = new apiApi();
  //     api.api = values;

  //     const mognoData = await apiApi.findOne();
  //     console.log(mognoData)

  //     await api.updateOne();

  //     res.send(mognoData);

  //   }).catch((err) => {
  //     console.log("error in whether api ------> : ", err)
  //   })
});

// app.post('/fetch',async(req,res) => {
//     let api = new apiApi();
//     api.api = values;

//     await api.save();

//     const mognoData = await apiApi.findOne();

//     res.send(mognoData);
// })

app.listen(8000, () => {
  console.log(`I'm running on port ${8000}`);
});
