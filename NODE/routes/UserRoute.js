const express = require("express");
const JWT = require("jsonwebtoken")
const router = express();
const User = require("../models/User");
router.post("/sign-up",
(req, res) => {
    let { firstName, lastName, email, password } = req.body;
    let user = new User({
      firstName,
      lastName,
      email,
      
    });
    user
      .save()
      .then(() => res.status(200).send(user))
      .catch((error) => {
        console.error(error);
        return res.status(500).send("ERROR");
      });
    });




router.post("/login", (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
        console.log(user);
        console.info(`User with email ${email} was successfully Found`);
        if (password === user.password) {
          const token = JWT.sign(
            {
              email: user.email,
              
            },
            "JIETSecretKey",
            {
              expiresIn: "1h",
            }
          );
          console.info("Login Success!!");
          return res.status(200).send({user, token})
        }
        console.warn("Invalid Password");
        return res.status(401).send("Password was Incorrect")
    }).catch ((error) => {
        console.error(`User with email ${email} doesn't exist!!`);
        return res.status(404).send(`User with email ${email} doesn't exist!!`);
    })
  
});
router.put("/update/:email", (req, res) => {
  let { email, password, firstName, lastName } = req.body;
  let emailParam = req.params.email;
  User.updateOne({ email: emailParam }, { $set: { email, password, firstName, lastName } }
  ).then(() => {
    console.info("update Success!!")
    return res.status(200).send({ email, password, firstName, lastName })

  }).catch((error) => {
    console.error("error occured!!");
    return (res.status(500).send("There was an error while updating the user"));
  })
})



module.exports = router;
