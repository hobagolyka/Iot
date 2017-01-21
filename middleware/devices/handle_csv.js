var mysql = require('mysql');
var connection = require('../../config/config');
var moment = require('moment');
var Papa = require("../papaparse.js");

module.exports = function () {

    return function (req, res, next) {
        var insert_data = req.body;

        var ddata = JSON.parse(req.body.data);

        var results = Papa.parse(ddata, {
            header: true,
            newline: "\n",
        });

        var d = moment();
        var date = new Date(d);

        results.data.forEach(function(item){
            console.log(item.Name);

            var newdevice= { TS: date,
                NAME: (typeof item.Name !== 'undefined') ? item.Name : '',
                DATA: (typeof insert_data.comment !== 'undefined') ? insert_data.comment : '',
                IP: (typeof item.Addresses !== 'undefined') ? item.Addresses : '',
                CORD1: (typeof insert_data.lat !== 'undefined') ? insert_data.lat : '',
                CORD2: (typeof insert_data.lng !== 'undefined') ? insert_data.lng : '',
                ADDRESS: (typeof insert_data.address !== 'undefined') ? insert_data.address : '',
                TYPE: (typeof item.Type !== 'undefined') ? item.Type : '',
                OIDS: (typeof insert_data.oid !== 'undefined') ? insert_data.oid : ''
            };

            connection.query('INSERT INTO devices SET ?', newdevice, function(err,res){
                if(err) {
                    return connection.rollback(function() {
                        console.log(err);
                    });
                }
            });

        })

        return next();
    };
};

