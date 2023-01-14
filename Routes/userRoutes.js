const express = require('express');

const userController = require('../Controller/userController');
const { createUser, checkUser, profile, verifyToken } = userController;

const router = express.Router();

router.route('/signup').post(createUser);
router.route('/login').post(checkUser);
router.route('/profile').post(verifyToken, profile);

module.exports = router;