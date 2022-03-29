let router = require("express").Router();
const mongoose = require("mongoose");
const users = require("./models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    users.find({}, { password: 0 }).then((user) => {
      return res.send(user);
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

// get a specific user from ID
router.get("/:id", async (req, res) => {
  try {
    const userById = await users.findById(
      { _id: req.params.id },
      { password: 0 }
    );
    res.send(userById);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/peruser", async (req, res) => {
  try {
    const email = await users.find({ email: req.body.email });
    console.log(email[0]);
    res.send(email[0]);
  } catch (error) {
    return res.sendStatus(404);
  }
});

// register
router.post(
  "/register",
  async (req, res, next) => {
    // email already used
    const userExists = await users.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({
        msg: "email is already used",
      });
    }
    // password (repeat) does not match
    if (
      !req.body.passwordRepeat ||
      req.body.password !== req.body.passwordRepeat
    ) {
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }
    next();
  },
  async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send({
          msg: "error in hashing the pwd",
        });
      } else {
        const Post = new users({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
        });
        try {
          const savedPost = await Post.save();
          res.send(savedPost);
        } catch (error) {
          return res.status(404).send("error in saving the data");
        }
      }
    });
  }
);

router.post("/login", async (req, res, next) => {
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ msg: "email not found" });
  }

  bcrypt.compare(req.body.password, user.password, async (bErr, bResult) => {
    // wrong password
    if (bErr) {
      return res.status(401).send({
        msg: "Username or password is incorrect!",
      });
    }
    if (bResult) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          admin: user.isAdmin,
        },
        "1TvH2QBqMX72ZtA7kay0kYiGovWKbCZbGZI",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({
        msg: "Logged in!",
        token,
        user: user,
      });
    } else {
      return res.status(401).send({
        msg: "Username or password is incorrect!",
      });
    }
  });
});

// router.post("/add", async (req, res) => {
//   const Post = new users({
//     username: req.body.username,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//     isAdmin: req.body.isAdmin,
//   });
//   try {
//     const savedPost = await Post.save();
//     res.send(savedPost);
//   } catch (error) {
//     return res.status(404).send(error);
//   }
// });

router.put("/", async (req, res) => {
  try {
    const newuser = await users.findOneAndUpdate(
      { email: req.body.email },
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // email: req.body.email,
        $inc: { score: req.body.score },
      },
      { returnNewDocument: true }
    );
    res.send(newuser);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.put("/dec", async (req, res) => {
  try {
    const newuser = await users.findOneAndUpdate(
      { email: req.body.email },
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // email: req.body.email,
        $inc: { score: -req.body.score },
      },
      { returnNewDocument: true }
    );
    res.send(newuser);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await users.findByIdAndRemove({ _id: req.params.id });
    res.send(removedUser);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
