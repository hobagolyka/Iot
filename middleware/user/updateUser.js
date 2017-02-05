var mysql = require('mysql');
var connection = require('../../config/config');

module.exports = function () {

    return function (req, res, next) {
        var insert_data = req.body;

        if(insert_data.pw != ''){
            connection.query('UPDATE users SET pw = MD5(\''
                + insert_data.pw + '\') Where ID = '
                + req.session.userid,
                function(err,res){
                    if(err) {
                        return connection.rollback(function() {
                            console.log(err);
                        });
                    }

                })
            ;}

        return next();
    };
};
