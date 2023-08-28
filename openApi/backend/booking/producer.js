const amqp = require('amqplib');
const config = require('./config')

class Producer {
  channel;

  async createChannel () {
    const connection =  await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    
    if(!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, 'fanout');

    const logDetails = {
      logType: routingKey,
      from: message.from,
      to: message.to,
      date: message.date,
      name: message.name,
      age: message.age
    }

    const isMessage = await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    )

    console.log(isMessage);

    console.log(`key : ${routingKey}, message : ${message}`)
  }
}


module.exports = Producer;
