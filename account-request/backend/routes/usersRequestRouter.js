const express = require('express');
const { RegisterUser, allUsers, userById, deleteById } = require('../controllers/usersController');
const router = express.Router();

router.route("/").post(RegisterUser);
router.route("/").get(allUsers);
router.route("/:uuid").get(userById);
router.route("/:uuid").delete(deleteById);

module.exports = router;