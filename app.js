var io = require('pm2')
var http = require('http');

var server = http.createServer(function (request, response) {

    var result = pm2.list(function(){
        // error, return 400
    })
    console.log(result);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

server.listen(8086);
console.log("Server running at http://127.0.0.1:8086/");