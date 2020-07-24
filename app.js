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
        console.error("Invalid app, please provide one of: [" + apps.join(',') + "]");
        return res.status(500).send("Invalid app, please provide one of: [" + apps.join(',') + "]");
    }

    pm2.connect(function (err) {

        if (err) {
            console.error(err);
            return res.status(500).send("An error occured!");
        }

        pm2.describe(req.params.app, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occured!");
            }
            
            return res.send(result.pm2_env.status);            
        });
    });
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
