const express = require("express");
const mongoose = require("mongoose");
const nApp = express();
const userRoutes = require("./routes/UserRoute");
 const { route } = require("./routes/UserRoute");
nApp.use(express.urlencoded({ extended: false }));
nApp.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/JIET", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.info("MongoDB connected successfully");
  })
  .catch(() => {
    console.error("MongoDB connection failed.");
  });
  
nApp.use(userRoutes);


  nApp.listen(7000, () => {
    console.log("Server is runnong on port no. 7000")
});