const express = require("express");
const router = express.Router();


const {} = require("../controllers/userController");

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

module.exports = router;