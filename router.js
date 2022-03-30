const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

app.use(bodyparser.json());
app.use(express.json());
// import routers
app.use(
  cors({ origin: "https://polysmash.netlify.app", optionSuccesStatus: 204 })
);
app.use("/api/users", require("./users"));
app.use("/api/choices", require("./choices"));
app.use("/api/news", require("./news"));
app.use("/api/store", require("./store"));
app.use("/api/suggestions", require("./suggestions"));

app.get("/api", (req, res) => {
  res.send("ugh, you're not supposed to be there bud :S");
});

app.get("/", (req, res) => {
  res.send("please, don't break me, I'm a nice api :D");
});
// connect to db
try {
  mongoose.connect(
    "mongodb+srv://unixy:Q77Bq3a8NTC2tny@cluster0.h56hv.mongodb.net/adopteunig?retryWrites=true",
    { UseNewUrlParser: true },
    () => {
      console.log("connected to db on 8000");
    }
  );
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT || 8000);
