const express = require("express");
const router = express.Router();
const User = require("../models").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  User.findAll().then(function(users) {
    res.render("users/users-index", { users: users });
  });
});

router.post("/cadastrar", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Este email já existe." });
    } else {
      let password = req.body.password;
      console.log(password);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          User.create({
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: password
          })
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/entrar", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Usuário não encontrado." });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, role: user.role };
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(404).json({ password: "Senha incorreta" });
      }
    });
  });
});

module.exports = router;
