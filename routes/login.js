var express = require("express");
var router = express.Router();
var models = require("../models");
var passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("autenticacao/signup");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  })
);

router.get("/login", (req, res) => {
  res.render("autenticacao/login");
});

router.post(
  "/login",
  passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

module.exports = router;
