const UserModel = require("../models/userSchema");
const { startSession } = require("mongoose");

const { v4: uuidv4 } = require("uuid");
const Producer = require("../producer");
const userModel = require("../models/userSchema");

const producer = new Producer();

const RegisterUser = async (req, res) => {
  const session = await startSession();
  const uuid = uuidv4();

  try {
    const UserData = req.body;
    const routing_key = process.env.ROUTING_KEY;

    session.startTransaction();

    UserData.uuid=uuid;
    const userRequest = new UserModel(UserData);
    // console.log(userRequest,UserData);

    const savedUserRequest = userRequest.save();

    const rabbitmqInfo = {
      uuid: uuid,
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
      res.status(500).json({
        error:
          "ERROR: occured while creating new user request.",
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
  try {
    userModel.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log("Error occurred while fetching all users : " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const userById = (req, res) => {
  const uuid = req.params.uuid;

  try {
    userModel.findOne({ uuid: uuid }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log("Error occurred while fetching user with uuid:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteById = (req, res) => {
  const uuid = req.params.uuid;

  try {
    userModel.deleteOne({ uuid: uuid }).then((result) => {
      console.log(result);
      res.status(200).send("User Deleted");
    });
  } catch (error) {
    console.log(
      "Error occurred while deleting the user with uuid:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports = { RegisterUser, allUsers, userById, deleteById };
