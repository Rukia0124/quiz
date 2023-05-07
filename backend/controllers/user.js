const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

exports.signup = (req, res, next) => {
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  console.log(req.body);
  userService
    .signup(userPassword, userEmail)
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  userService
    .login(userPassword, userEmail)
    .then((token) => {
      res.status(200).json(token);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
