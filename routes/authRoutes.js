const express = require('express');
const AuthRoutes = express.Router();
const AuthController = require("../controllers/authController")

AuthRoutes.post('/register', AuthController.Register);
AuthRoutes.post('/login', AuthController.Login);

module.exports = AuthRoutes;