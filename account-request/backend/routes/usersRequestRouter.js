const express = require('express');
const {RegisterUser,allUsers,userById} = require('../controllers/usersController');
const router = express.Router();

router.route("/").post(RegisterUser);
router.route("/").get(allUsers);
router.route("/:uuid").get(userById);

module.exports = router;