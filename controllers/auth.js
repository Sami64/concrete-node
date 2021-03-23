const express = require("express");
const User = require("../models/user");

exports.getLogin = (req, res) => {
  //const isLoggedIn = req.get("Cookie").split(";")[1].split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  User.findByPk(1)
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
