const amqp = require("amqplib");

const consumeMessages = async() => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange("booking", "direct");

  const q = await channel.assertQueue("BookingQueue");

  await channel.bindQueue(q.queue, "booking", "details");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  })
}

consumeMessages();




























// const express = require("express");
// const cors = require("cors");
// const amqp = require("amqplib");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/details", async (req, res) => {
//     let details = "";
//   try {
//     connection = await amqp.connect("amqp://localhost:5672");
//     channel = await connection.createChannel();

//     await channel.assertQueue("test", { durable: true });

//     channel.consume(
//       "test",
//       (data) => {
//         console.log(`${Buffer.from(data.content)}`);
//         details=JSON.parse(Buffer.from(data.content));
//         console.log(details.from)
//         channel.ack(data);
        
//         res.status(200).send(details);
//       },
//       { noAck: false }
//     );

//   } catch (err) {
//     console.log(err);
//     res.status(200).send("Rejected!");
//   }
// });

// app.listen(8001, () => {
//   console.log("I am running on port 8001");
// });
