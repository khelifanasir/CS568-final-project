const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const carRouter = require("./routes/carRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/car", carRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/cars")
  .then(() => {
    app.listen(5000, () => console.log("listening to 5000...."));
  })
  .catch((err) => console.log(err + "there is error"));
