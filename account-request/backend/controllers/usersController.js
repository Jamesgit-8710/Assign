const UserModel = require("../models/userSchema");
const { startSession } = require("mongoose");

const { v4: uuidv4 } = require("uuid");
const Producer = require("../producer");
const userModel = require("../models/userSchema");

const producer = new Producer();

const RegisterUser = async (req, res) => {
  const session = await startSession();

  try {
    const UserData = req.body;
    const routing_key = process.env.ROUTING_KEY;

    session.startTransaction();

    const userRequest = new UserModel(UserData);
    // console.log(userRequest,UserData);

    const savedUserRequest = userRequest.save();

    const rabbitmqInfo = {
      uuid: uuidv4(),
      fired_at: new Date().toISOString(),
      // userRequest: updatedResponse,
      eventType: "user-request-created",
    };

    const isMessagePublished = await producer.publishMessage(
      routing_key,
      rabbitmqInfo
    );
      
    if (isMessagePublished && savedUserRequest) {
      await session.commitTransaction();
      res.status(201).json({
        status: "Created",
      });
    } else { 
      await session.abortTransaction();
      updatedResponse && helper.deleteFromDataBase(updatedResponse.uuid);
      res.status(500).json({
        error:
          "Failed to publish message to RabbitMQ and saving data in database",
      });
    }
  } catch (err) {
    console.log("Error while creating user request!", err.message);
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const allUsers = (req, res) => {
  userModel.find({}).then((result) => {
    res.status(200).send(result);
  });
};

const userById = (req, res) => {
  const uuid = "req.params.uuid";
  console.log(uuid)
//   userModel.findOne({uuid: uuid}).then((result) => {
//     console.log(result)
//     res.status(200).send("result");
//   });
res.send("fgsfgdfgsdfsfffffffffffffffffffff")
};

module.exports = { RegisterUser, allUsers, userById };
