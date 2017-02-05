var mysql = require('mysql');
var connection = require('../../config/config');

function dbconnect(req, callback, data) {
    var username = mysql.escape(data.username);
    var password = mysql.escape(data.pw);

    // 'SELECT * FROM users WHERE user = ' + username +  ' AND pw = MD5(' + password + ')'
    // 'INSERT INTO users (user,pw) VALUES(\'tilla\',MD5(\'Tillaiso9660\'))'

    connection.query('SELECT * FROM users WHERE user = ' + username +  ' AND pw = MD5(' + password + ')', function(err,row){
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

                if(result.length == 0){
                    res.tpl.alert = true;
                    return next();
                }
                else{

                    req.session.userid = result[0].ID;
                    res.tpl.user = result[0];
                    //redirect to / so the app can decide where to go next
                    return res.redirect('/');
                }
            }
            return next();
        }, req.body);

    };
};
