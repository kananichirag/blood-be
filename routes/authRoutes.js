const express = require('express');
const AuthRoutes = express.Router();
const AuthController = require("../controllers/authController")

AuthRoutes.post('/register', AuthController.Register);
AuthRoutes.post('/login', AuthController.Login);

AuthRoutes.get('/users', AuthController.getAllUsers);
AuthRoutes.get('/users/:id', AuthController.GetUser);
AuthRoutes.put('/users/:id', AuthController.UpdateUser);

module.exports = AuthRoutes;