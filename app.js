var pm2 = require('pm2');
var http = require('http');

var server = http.createServer(function (request, response) {
    
    response.writeHead(200, {"Content-Type": "text/plain"});

    pm2.connect(function (err) {

        if (err) {
            console.error(err);
            process.exit(2);
        }
        else {
            pm2.list((err, list) => {
                console.log(err, list);
                response.end("Hello World\n");
            });
        }
    });

});

server.listen(8086);
console.log("Server running at http://127.0.0.1:8086/");