const User = require("../models/User");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

exports.Signup = (req, res) => {
    let { firstName, lastName, email, password, DOB } = req.body;
    let user = new User({
        firstName,
        lastName,
        email,
        password,
        DOB
    });
    user.save().then(() => {
        return res.status(200).send(user)
    }).catch((error) => {
        return res.status(500).send("problem")
    });
}


exports.login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {

        console.info(`User with email ${email} was successfully Found`);
      if (password === user.password) {
        
          const token = getToken(user);
          console.info("Login Success!!");
          return res.status(200).send(`Welcome ${user.firstName} your details are ${user} and your token is ${token}  `)
        }
        console.warn("Invalid Password");
        return res.status(401).send("Password was Incorrect")
    }).catch ((error) => {
        console.error(`User with email ${email} doesn't exist!!`);
        return res.status(404).send(`User with email ${email} doesn't exist!!`);
    })
  
};

exports.getById =  (req, res) => {
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    User.findOne({ _id: id }).then((user) => {
        if (user) {
            console.log("Successfull")
            return res.status(200).send(user);
        
        }
    }).catch((error) => {
        console.log("Error")
        return res.status(404).send("error");
 
    });
};

exports.postBlog = (req, res) => {
    let { heading, blog } = req.body;
    if (!req.headers.token) {
      console.error("No token was sent");
      return res.status(403).send("Invalid token");
    }
    let decodedToken = JWT.verify(req.headers.token, "ssshhhItsASecretDontTellAnyone"); 
    let userId = decodedToken[ Object.keys(decodedToken)[0]];
    userId = mongoose.Types.ObjectId(userId);
    let blogPost = new Blog({
        heading,
        blog,
        userId
    });
    blogPost.save().then(() => {
        return res.status(200).send(blogPost);
    }).catch(() => {
        return res.status(500).send("an erroer Occured");
    })
}

// exports.getblogByid = (req, res) => {
//     let id = req.params.userId;
//     id = mongoose.Types.ObjectId(id);
//     Blog.findOne({ _id: id }).then((post) => {
//         if (post) {
//             console.log("Successfull")
//             return res.status(200).send(post);
        
//         }
//     }).catch((error) => {
//         console.log("Error")
//         return res.status(404).send("error");
 
//     });
// };




exports.getblog = (req, res) => {
    let  userId  = req.params.id;
    userId = mongoose.Types.ObjectId(userId);
    Blog.find({ userId }).then((blogPost) => {
        if (blogPost.length === 0) {
            return res.status(404).send(`no blog was posted by user with userId :${userId}` )
        
        }console.log("Successfull")
        return res.status(200).send(blogPost);
    }).catch((error) => {
        console.log("Error")
        return res.status(404).send("error");
 
    });
};


const getToken =  (user) => {

    return token = JWT.sign(
        {
            id: user._id,
            email: user.email
        },
        "ssshhhItsASecretDontTellAnyone",
        {
            expiresIn: "1hr"
        }
       
    )
}



