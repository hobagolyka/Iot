var mysql = require('mysql');
var connection = require('../../config/config');

/* kapcsolódik a mysql adatbázishoz, callback-ben elküldi az adatokat és a hibaüzeneteket */
function dbconnect(callback) {

    connection.query('SELECT * FROM devices', function(err,rows){
        if (err) {
            throw err;
        }
        return callback(err, rows);
    });
}

module.exports = function () {

    return function (req, res, next) {

        dbconnect(function(err, results){
            if (err) throw err;
            else {
                res.tpl.adatok = results;
            }
            return next();
        });
    };
};