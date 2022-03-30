let router = require("express").Router();
const mongoose = require("mongoose");
const choices = require("./models/choicesModel");

router.get("/", async (req, res) => {
  try {
    choices.find({}, "firstname lastname source usersId").then((choice) => {
      return res.send(choice);
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/ask", async (req, res) => {
  try {
    const choice1 = await choices.find(
      { usersId: req.body.id1 },
      "usersId score"
    );
    const choice2 = await choices.find(
      { usersId: req.body.id2 },
      "usersId score"
    );

    if (choice1[0].score > choice2[0].score) {
      // const choice1 = await choices.find(
      //   { usersId: req.body.id1 },
      //   "usersId score"
      // );
      res.send(choice1);
    } else if (choice1[0].score === choice2[0].score) {
      res.send([{ usersId: 0, score: 0 }]);
    } else {
      // const choice2 = await choices.find(
      //   { usersId: req.body.id2 },
      //   "usersId score"
      // );
      res.send(choice2);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// get a specific choice from ID
router.get("/:id", async (req, res) => {
  try {
    const choiceById = await choices.findOne({ usersId: req.params.id });
    res.send(choiceById);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const Post = new choices({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    source: req.body.source,
  });
  try {
    const savedPost = await Post.save();
    res.send(savedPost);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const newchoice = await choices.findOneAndUpdate(
      { usersId: req.body.id },
      {
        source: req.body.source,
        $inc: { score: req.body.score },
      },
      { returnNewDocument: true }
    );
    res.send(newchoice);
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const removedchoice = await choices.findByIdAndRemove({
      _id: req.body.id,
    });
    res.send(removedchoice);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
