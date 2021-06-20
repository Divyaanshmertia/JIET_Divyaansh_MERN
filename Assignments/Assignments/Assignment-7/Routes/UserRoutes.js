const express = require("express");
const router = express();
const User = require("../models/User");
const UserController = require("../Controller/UserController");
router.post("/Signup",UserController.Signup);
router.post("/login", UserController.login)
router.get("/getUser/:id", UserController.getById);
router.post("/postblog", UserController.postBlog);
router.get("/getblog/:id", UserController.getblog);
module.exports = router;