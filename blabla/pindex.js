const http = require('http');
var mysql = require('mysql');
var connection = require('../config/config');
var ping = require('ping');

const hostname = 'localhost';
const port = 3001;

function dbconnect(callback) {

    connection.query('SELECT * FROM devices', function(err,rows){
        if (err) {
            throw err;
        }
        return callback(err, rows);
    });
}

const server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

setInterval(function() {
    dbconnect(function (err, results) {
        if (err) throw err;
        else {

            results.forEach(function (item) {
                host = item.IP;
                ping.sys.probe(host, function (isAlive) {
                    console.log(host + ' ' + isAlive);
                    connection.query(
                        'UPDATE devices SET status =' + isAlive + ' Where ID =' + item.ID,
                        function (err, result) {
                            if (err) throw err;
                        }
                    );
                });

            });
        }
    });
}, 10000);

server.listen(port, hostname, function(){
    console.log('Server running at http://${hostname}:${port}/');
});
