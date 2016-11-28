var mysql = require('mysql');
var connection = require('../../config/config');

function dbconnect(req, callback) {

    connection.query('SELECT * FROM devices WHERE ID = ?', req.param('id'), function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {

        dbconnect(req, function(err, result){
         
            if (err) throw err;
            else {
                res.tpl.adatok = result[0];
            }
            return next();
        });
    };
};