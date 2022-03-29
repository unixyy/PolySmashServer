let router = require("express").Router();
const mongoose = require("mongoose");
const store = require("./models/storeModel");

router.get("/", async (req, res) => {
  try {
    store.find({}).then((storeItem) => {
      return res.send(storeItem);
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

// get a specific storeItem from ID
router.get("/:id", async (req, res) => {
  try {
    const storeItemById = await store.findById({ _id: req.params.id });
    res.send(storeItemById);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const Post = new store({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    source: req.body.source,
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
    const newstoreItem = await store.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        source: req.body.source,
      },
      { returnNewDocument: true }
    );
    res.send(newstoreItem);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const removedstoreItem = await store.findByIdAndRemove({
      _id: req.body.id,
    });
    res.send(removedstoreItem);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
