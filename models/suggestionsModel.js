const mongoose = require("mongoose");

const suggestionsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});

const suggestions = mongoose.model("suggestions", suggestionsSchema);

module.exports = suggestions;
