var mysql = require('mysql');
var connection = require('../../config/config');

function dbconnect(req, callback) {

    connection.query('SELECT * FROM devices WHERE STATUS = true', function(err,row){
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
                res.tpl.actives = result;
                res.tpl.page = req.param('page');
            }
            return next();
        });
    };
};
