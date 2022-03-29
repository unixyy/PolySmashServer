const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const news = mongoose.model("news", newsSchema);

module.exports = news;
