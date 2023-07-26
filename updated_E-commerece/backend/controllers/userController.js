const users = require("../models/userModel");

const user = async (req, res) => {
  const user = new users();

  user.username = req.body.user;
  user.password = req.body.pass;
  user.prof = req.body.val;
  user.cart = [];
  user.status = true;
  user.date = req.body.date;
  user.profile = "";

  await user.save();

  res.status(200).send(true);
};

const exist = async (req, res) => {
  let i = "";

  await users.find().then((result) => {
    // console.log("----------------> ", result);
    result.forEach((element) => {
      if (element.username == req.body.user) {
        i = element._id;
        return;
      }
    });
  });

  if (i != "") {
    res.send(i);
  } else {
    res.send(false);
  }

  //   res.status(200).send(true);
};

const checkActive = async (req, res) => {
  await users.find({ _id: req.body.id }).then((result) => {
    res.status(200).send(result);
  });

  //   res.status(200).send(true);
};

const check = async (req, res) => {
  let i = "";

  await users.find().then((result) => {
    // console.log("----------------> ", result);
    result.forEach((element) => {
      if (
        element.username == req.body.user &&
        element.password == req.body.pass
      ) {
        i = element._id;
        return;
      }
    });
  });

  if (i != "") {
    res.send(i);
  } else {
    res.send(false);
  }

  //   res.status(200).send(true);
};

const allUsers = async (req, res) => {
  await users.find({}).then((result) => {
    res.status(200).send(result);
  });

  //   res.status(200).send(true);
};

const cartData = async (req, res) => {
  await users.find({ _id: req.body.id }).then((result) => {
    // console.log(result[0].cart);
    res.status(200).send(result[0].cart);
  });

  //   res.status(200).send(true);
};

const totalAmount = async (req, res) => {
  console.log("first");

  await users.find({ _id: req.body.id }).then((result) => {
    // console.log(result[0].cart);
    let sum = 0;
    result[0].cart.map((i) => {
      const price = i.price;
      const count = i.count;
      sum += price * count;
    });
    res.status(200).send({ sum });
  });

  //   res.status(200).send(true);
};

const stat = async (req, res) => {
  await users.findOne({ _id: req.body.id }).then((result) => {
    console.log(result);
    res.status(200).send(result.prof);
  });

  //temp
  // res.status(200).send(true);
};

const setImg = async (req, res) => {
  // console.log(req.body)

  await users.updateOne(
    { _id: req.body.id },
    { $set: { profile: req.body.data } }
  );

  res.status(200).send(true);
};

const getImg = async (req, res) => {
  // console.log(req.body)

  await users.findOne({ _id: req.body.id }).then((data) => {
    res.status(200).send(data.profile);
  });

  // res.status(200).send(true);
};

const updateKey = async (req, res) => {
  // console.log(req.body)

  await users.updateOne({ _id: req.body.id }, { status: req.body.key });

  res.status(200).send(true);
};

const updateItem = async (req, res) => {
  // console.log(req.body)

  const id = { _id: req.body.id };

  const data = { $set: { "cart.$[i].count": req.body.data } };

  const filter = { arrayFilters: [{ "i.itemId": req.body.itemId }] };

  await users.updateOne(id, data, filter);

  res.status(200).send(true);
};

const deleteItem = async (req, res) => {
  // console.log(req.body)

  const id = { _id: req.body.id };

  const filter = { $pull: { cart: { itemId: req.body.itemId } } };

  await users.updateOne(id, filter);

  res.status(200).send(true);
};

const checkExist = async (req, res) => {
  const arr = await users.findOne({ _id: req.body.myId });

  const arr2 = arr.cart;

  res.status(200).send(arr2);
};

const clearCart = async (req, res) => {
  await users.updateOne({ _id: req.body.myId }, { $set: { cart: [] } });

  res.status(200).send(true);
};

const checkCart = async (req, res) => {
  const arr = await users.findOne({ _id: req.body.myId });

  const arr2 = arr.cart;

  res.status(200).send(arr2.some((el) => el.itemId === req.body.id));
};

const getUser = async (req, res) => {
  await users.findOne({ _id: req.body.id }).then((result) => {
    res.status(200).send(result);
  });

  //   res.status(200).send(true);
};

const updateUser = async (req, res) => {
  // console.log(req.body)

  await users.updateOne({ _id: req.body.id }, { $set: req.body.data });

  res.status(200).send(true);
};

const cart = async (req, res) => {
  // console.log(req.body)

  await users.updateOne(
    { _id: req.body.id },
    { $push: { cart: req.body.data } }
  );

  res.status(200).send(true);
};

module.exports = {
  user,
  exist,
  checkActive,
  check,
  allUsers,
  cartData,
  totalAmount,
  stat,
  setImg,
  getImg,
  updateKey,
  updateItem,
  deleteItem,
  checkExist,
  clearCart,
  checkCart,
  getUser,
  updateUser,
  cart
};
