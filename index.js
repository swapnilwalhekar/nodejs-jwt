const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secreteKey = "mine-sw-key";

app.get("/", function (req, res) {
  res.json({
    message: "response from server",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "swapnil",
    email: "sw@gmail.com",
  };

  jwt.sign({ user }, secreteKey, { expiresIn: "30d" }, (error, token) => {
    res.json({
      message: "login api called successfully",
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey, (error, authData) => {
    if (error) {
      res.send({
        result: "Invalid token",
      });
    } else {
      res.json({
        message: "profile accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerToken = req.headers["authorization"];

  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "token id invalid",
    });
  }
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log("ok server is running on port:", PORT);
});
