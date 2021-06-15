var http = require("http");
var module = require("./module");

http.createServer((req, res) => {
    res.writeHead(200);
    res.write("The Current Date and Time is : " + module.myModule())
    res.end();

})
    .listen(8080)
