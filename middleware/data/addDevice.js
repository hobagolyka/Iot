var mysql = require('mysql');
var connection = require('../../config/config');
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {
        var insert_data = req.body;
        console.log(req.body);
        var d = moment();
        var date = new Date(d);
        var newdevice= { TS: date,
            NAME: (typeof insert_data.name !== 'undefined') ? insert_data.name : '',
            DATA: (typeof insert_data.comment !== 'undefined') ? insert_data.comment : '',
            IP: (typeof insert_data.ip!== 'undefined') ? insert_data.ip : '',
            CORD1: (typeof insert_data.lat !== 'undefined') ? insert_data.lat : '',
            CORD2: (typeof insert_data.lng !== 'undefined') ? insert_data.lng : '',
            ADDRESS: (typeof insert_data.address !== 'undefined') ? insert_data.address : '',
            TYPE: (typeof insert_data.type !== 'undefined') ? insert_data.type : '',
            OIDS: (typeof insert_data.oid !== 'undefined') ? insert_data.oid : ''
        };

        connection.query('INSERT INTO devices SET ?', newdevice, function(err,res){
            if(err) {
                return connection.rollback(function() {
                    console.log(err);
                });
            }
        });
      return next();
    };
};
