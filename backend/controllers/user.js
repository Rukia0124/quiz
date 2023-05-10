const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

exports.signup = (req, res, next) => {
  const userName = req.body.pseudo;
  const userPassword = req.body.password;
  const userEmail = req.body.email;

  if (!userName || !userPassword || !userEmail) {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être remplis !" });
  }

  userService
    .signup(userName, userPassword, userEmail)
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.login = (req, res, next) => {
  const userName = req.body.pseudo;
  const userPassword = req.body.password;

  if (!userName || !userPassword) {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être remplis !" });
  }

  userService
    .login(userPassword, userName)
    .then((token) => {
      res.status(200).json(token);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
