const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });


class Producer {
  channel;

  async create() {
    try {
      const connection = await amqp.connect(process.env.AMQP_URL);
      this.channel = await connection.createChannel();
      console.log("RabbitMQ connection successful");
    } catch (error) {
      console.log("RabbitMQ connection failed : ", error);
    }
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.create();
    }

    const exchangeName = process.env.RABBITMQ_EXCHANGENAME;
    const exchangeType = "fanout";
    await this.channel.assertExchange(exchangeName, exchangeType);

    const queueName = process.env.EXCHANGE_QUEUE;

    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.bindQueue(queueName, exchangeName, routingKey);

    const properties = {
      contentType: "application/json",
      persistent: true,
      headers: { type: "User Creation event is done" },
      messageId: message.uuid,
      eventType: message.eventType,
    };

    const isMessagePublished = await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      properties
    );

    console.log(isMessagePublished);

    console.log(`Message Published : ${message}`);

    return isMessagePublished;
  }
}

module.exports = Producer;
