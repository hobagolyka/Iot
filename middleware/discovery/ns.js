var snmp = require ("net-snmp");
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {
        var io = res.tpl.socket;
        var nsp = io.of('/'+req.param('id'));

        nsp.on('connection', function(socket){
            console.log('someone connected');
            res.tpl.snmp.forEach(function(item){
                if(item.oid == "1.3.6.1.2.1.1.3.0"){
                    setInterval(function() {
                    nsp.emit('hi', item.value); }, 1000);}
            });
        });

        return next();
    };

};