var mysql = require('mysql');
var connection = require('../../config/config');

function dbconnect(req, callback, data) {
    var username = data.username;
    var password = data.pw;

    connection.query('SELECT * FROM users WHERE user = ' + username + ' AND pw = MD5(\'' + password + '\')', function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
        res.tpl.alert = false;

        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') || (typeof req.body.pw === 'undefined')) {
            res.tpl.alert = false;
            return next();
        }

        dbconnect(req, function(err, result){

            if (err) throw err;
            else {
                if(typeof result == 'undefined'){
                    res.tpl.alert = true;
                    return next();
                }
                else{
                    req.session.userid = 21452;
                    //redirect to / so the app can decide where to go next
                    return res.redirect('/');
                }
            }
            return next();
        }, req.body);

    };
};
