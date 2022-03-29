let router = require("express").Router();
const mongoose = require("mongoose");
const suggestions = require("./models/suggestionsModel");

router.get("/", async (req, res) => {
  try {
    suggestions.find({}).then((suggestion) => {
      return res.send(suggestion);
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

// get a specific suggestion from ID
router.get("/:id", async (req, res) => {
  try {
    const suggestionById = await suggestions.findById({ _id: req.params.id });
    res.send(suggestionById);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const Post = new suggestions({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
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
    const newsuggestion = await suggestions.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
      },
      { returnNewDocument: true }
    );
    res.send(newsuggestion);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedsuggestion = await suggestions.findByIdAndRemove({
      _id: req.params.id,
    });
    res.send(removedsuggestion);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
