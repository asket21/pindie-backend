const users = require("../models/user.js");
const jwt = require("jsonwebtoken");
const path = require("path");

const login = (req, res) => {
  const { email, password, username } = req.body;
  
  users
    .findUserByCredentials(email, password,username)
    .then((user) => {
      const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, "i-lost-my-key", {
      expiresIn: "6h"
      });
      
      return { user, token };
    })
    .then(({user, token}) => {
      res
        .status(200)
        .send({ _id: user._id, username: user.username, email: user.email, jwt:token });
    })
    .catch(error => {
      res.status(401).send({ message: error.message });
    });
}; 

const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
    jwt.verify(req.cookies.jwt, "i-lost-my-key");
    return res.redirect(path.join("/admin/dashboard.html"));
  } catch (err) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};



const sendDashboard = (req, res) => {
  if (req.cookies.jwt) {
    try {
      jwt.verify(req.cookies.jwt, "i-lost-my-key");
      return res.sendFile(
        path.join(__dirname, "../public/admin/dashboard.html")
      );
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
}; 

module.exports = { login, sendIndex, sendDashboard };
