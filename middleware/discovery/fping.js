var ping = require('ping');

module.exports = function () {

    return function (req, res, next) {
        var host = res.tpl.host;
        var io = res.tpl.socket;
        
        ping.sys.probe(host, function(isAlive){
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            console.log(msg);
            res.tpl.alive = isAlive ? 1 : 0;
            return next();
        });
    }
};
