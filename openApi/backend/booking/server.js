const express = require("express");
const cors = require("cors");
const amqp = require("amqplib");
const Producer = require("./producer");

const producer = new Producer();
const app = express();
app.use(cors());
app.use(express.json());


app.post('/sendDetails', async(req, res) => {
  await producer.publishMessage("details", req.body.message);
  res.send("Done");
})


app.listen(8000, () => {
  console.log("I am running on port 8000");
});