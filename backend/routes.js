const express = require('express');
const { signup, login, profile, logout } = require('./controller');
const authenticateToken = require('./authMiddleware');
const router = express.Router();


// Require the controllers WHICH WE DID NOT CREATE YET!!


router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', authenticateToken, profile);

router.get('/logout', logout);

module.exports = router;