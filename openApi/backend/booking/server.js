const express = require("express");
const cors = require("cors");
const amqp = require("amqplib");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/book", async (req, res) => {
  const data = req.body;

  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("test",{durable: true});
    await channel.sendToQueue("test", Buffer.from(JSON.stringify(data)), {persistance: true});

    // close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }

  res.status(200).send("Done");

  //   res.status(201).send({user: req.body.user, pass: req.body.pass});
});

app.listen(8000, () => {
  console.log("I am running on port 8000");
});
