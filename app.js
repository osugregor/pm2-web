var pm2 = require('pm2');
var express = require('express')
const port = 8086

var app = express()
app.get('/:app', function (req, res) {
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
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
