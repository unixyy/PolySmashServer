let router = require("express").Router();
const mongoose = require("mongoose");
const news = require("./models/newsModel");

router.get("/", async (req, res) => {
  try {
    news.find({}).then((payload) => {
      return res.send(payload);
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

// get a specific payload from ID
router.get("/:id", async (req, res) => {
  try {
    const payloadById = await news.findById(
      { _id: req.params.id },
      { password: 0 }
    );
    res.send(payloadById);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const datenow = new Date();

  const Post = new news({
    title: req.body.title,
    description: req.body.description,
    date: datenow,
  });
  try {
    const savedPost = await Post.save();
    res.send(savedPost);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const newpayload = await news.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { returnNewDocument: true }
    );
    res.send(newpayload);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedpayload = await news.findByIdAndRemove({
      _id: req.params.id,
    });
    res.send(removedpayload);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
