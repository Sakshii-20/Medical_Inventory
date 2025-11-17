const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.get('/', (req, res) => res.render("home"));
router.get('/signup', (req, res) => res.render("signup"));
router.get('/signin', (req, res) => res.render("signin"));

// Signup
router.post('/create', userController.createuser);

// Signin
router.post('/signin', userController.loginuser);

// Dashboard
router.get('/dashboard', authMiddleware.requireAuth, userController.viewdashboard);

// Logout
router.get('/logout', userController.logoutuser);

module.exports = router;
