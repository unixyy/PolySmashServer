const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});
const store = mongoose.model("store", storeSchema);

module.exports = store;
