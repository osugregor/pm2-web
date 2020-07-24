var pm2 = require('pm2');
var express = require('express')
const port = 8086

var app = express()

var apps = [
    'bot'
]

app.get('/', function (req, res) {
    res.send("Provide an /app to check the status. Valid apps: ["+apps.join(',')+"]");
});

app.get('/:app', function (req, res) {

    if(!apps.includes(req.params.app)){
        res.send("Invalid app, please provide one of: [" + apps.join(',') + "]");
    }else{

        pm2.connect(function (err) {
    
            if (err) {
                console.error(err);
                process.exit(2);
            }
            else {
                pm2.describe('', (err, list) => {
                    console.log(err, list);
                    res.send(req.params.app);
                });
            }
        });

    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
