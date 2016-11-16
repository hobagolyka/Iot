var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'judit',
    database : 'iot'
});

module.exports = connection;
