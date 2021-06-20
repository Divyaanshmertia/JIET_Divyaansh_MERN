const Admin = require("../models/Admin")
const JWT = require("jsonwebtoken");
exports.AdminSignup = (req, res) => {
    let { firstName, lastName, email, password} = req.body;
    let admin = new Admin({
        firstName,
        lastName,
        email,
        password,
    });
    admin.save().then(() => {
        return res.status(200).send(admin)
    }).catch((error) => {
        return res.status(500).send("problem")
    });
}


exports.AdminLogin = (req, res) => {
    let { email, password } = req.body;
    Admin.findOne({ email: email }).then((admin) => {

        console.info(`Admin with email ${email} was successfully Found`);
      if (password === admin.password) {
        
          const token = getToken(admin);
          console.info("Login Success!!");
          return res.status(200).send(`Welcome ${admin.firstName} your details are ${admin} and your token is ${token}  `)
        }
        console.warn("Invalid Password");
        return res.status(401).send("Password was Incorrect")
    }).catch ((error) => {
        console.error(`admin with email ${email} doesn't exist!!`);
        return res.status(404).send(`Admin with email ${email} doesn't exist!!`);
    })
  
};




const getToken =  (admin) => {

    return token = JWT.sign(
        {
            id: admin._id,
            email: admin.email
        },
        "ssshhhItsASecretDontTellAnyone",
        {
            expiresIn: "1hr"
        }
       
    )
}