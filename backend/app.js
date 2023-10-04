//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const blogRouter = require("./router/blogRouter");
const cors = require("cors");

//middleware
const app = express();

app.use(express.json());
app.use(cors());

//logging requests
app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

//router
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//connect to db
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
