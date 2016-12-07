var ping = require('ping');
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {
        var hosts = res.tpl.hosts;
        var io = res.tpl.socket;
        var clients = 0;
        var tomb = [];
        
        io.on('connection', function(socket){
            clients++;
            setInterval(function(){
                hosts.forEach(function(host){
                    ping.sys.probe(host, function(isAlive){
                            var obj = {};
                            obj['ip'] = host;
                            obj['alive'] = isAlive ? 1 : 0;
                            tomb.push(obj);
                        });
                    });
                io.sockets.emit('broadcast',{ o: moment()});
            }, 1000);
            
            socket.on('disconnect', function () {
                clients--;
                io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
            });
        });
        
        return next();
    }
};
