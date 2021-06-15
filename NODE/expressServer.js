const express = require("express");

const server = express();
const axios = require("axios");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());


server.get("/", (req, res) =>{
    res.status(200).send("Hello World");
});

server.get("/about-us", (req, res) => {
    res.status(200).send("About The Company");

});

server.post("/log-in", (req, res) => {

    
    const email = req.body.email;
    const password = req.body.password;
    if (password === "Divyaansh")
        return res.status(200).send("Correct Password");
    return res.status(400).send("Worng Password");
})


// server.post("/add", (req, res) => {
//     const a = req.body.a;
//     const b = req.body.b;
    
//     if (typeof a == "number" && typeof b == "number" ) 
//         return res.status(200).send(`${parseInt(a)+ parseInt(b)}`);
//     return res.status(400).send("type is not a number");

// })



server.post("/multiply", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    if (typeof a == "number" && typeof b == "number" ) 
        return res.status(200).send(`${parseInt(a) * parseInt(b)}`);
    return res.status(400).send("type is not a number");

})

server.get("/pokemon", (req, res) => {
    axios.get("https://pokeapi.co/api/v2/ability/7").then((response) => {
        console.log(response.body)
        return res.status(200).send(response.data);
    }).catch((error) => {
        return res.status(500).send("error");
    })
})



server.listen(5000, () => {
    console.log("Server is runnong on port no. 5000")
});