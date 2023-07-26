const express = require("express");
const router = express.Router();

const {
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
  cart,
} = require("../controllers/userController");


// router.post('/user',user);

router.route("/user").post(user);
router.route("/exist").post(exist);
router.route("/checkActive").post(checkActive);
router.route("/check").post(check);
router.route("/allUsers").post(allUsers);
router.route("/cartData").post(cartData);
router.route("/totalamount").post(totalAmount);
router.route("/stat").post(stat);
router.route("/setImg").post(setImg);
router.route("/getImg").post(getImg);
router.route("/updateKey").post(updateKey);
router.route("/updateItem").post(updateItem);
router.route("/deleteItem").post(deleteItem);
router.route("/checkExist").post(checkExist);
router.route("/clearCart").post(clearCart);
router.route("/checkCart").post(checkCart);
router.route("/getUser").post(getUser);
router.route("/updateUser").post(updateUser);
router.route("/cart").post(cart);

module.exports = router;
