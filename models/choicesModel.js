const mongoose = require("mongoose");

const choicesSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  usersId: {
    type: Number,
  },
  // section: {
  //   school: {
  //     type: String,
  //     required: true,
  //   },
  //   year: {
  //     type: Number,
  //     required: true,
  //   },
  // },
});

const choices = mongoose.model("choices", choicesSchema);

module.exports = choices;
