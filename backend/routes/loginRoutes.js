const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/loginController');

router.post('/register', registerUser);
router.post('/auth', loginUser);

module.exports = router;
