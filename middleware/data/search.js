var mysql = require('mysql');
var connection = require('../../config/config');

function dbconnect(callback, findme) {

    /* keresés, escapelve! */
    connection.query(
        'SELECT * FROM devices WHERE name LIKE \"%\"' + mysql.escape(findme) + '\"%\"',
        function(err,rows){
            if (err) {
                throw err;
            }
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        /* keresett név */
        var findme = String(req.body.search);
        res.tpl.talalatok = {};
        res.tpl.page = req.param('page');

        dbconnect(function(err, results){
            if (err) throw err;
            else {
                res.tpl.talalatok = results;
            }
            return next();
        }, findme);

    };
};