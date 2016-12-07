var snmp = require ("net-snmp");
var moment = require('moment');

module.exports = function () {

    return function (req, res, next) {
        var IP = res.tpl.adatok.IP;
        var io = res.tpl.socket;

        //setInterval(function() {

            var session = snmp.createSession(IP, "public");

            var basic_oids = [
                "1.3.6.1.2.1.1.1.0",	 /* sysDescr */
                "1.3.6.1.2.1.1.2.0",	 /* sysObjectID */
                "1.3.6.1.2.1.1.3.0",	 /* sysUpTime */
                "1.3.6.1.2.1.1.4.0",	 /* sysContact */
                "1.3.6.1.2.1.1.5.0",	 /* sysName */
                "1.3.6.1.2.1.1.6.0"	   	 /* sysLocation */
            ];

            session.get(basic_oids, function (error, varbinds) {
                if (error) {
                    console.error(error);
                } else {
                    res.tpl.snmp = varbinds;
                    for (var i = 0; i < varbinds.length; i++)
                        if (snmp.isVarbindError(varbinds[i]))
                            console.error(snmp.varbindError(varbinds[i]));
                        else {
                            console.log(varbinds[i].oid + " = " + varbinds[i].value);
                            /*
                            io.sockets.emit('timer', { oid: varbinds[i].oid,
                                value: varbinds[i].value,
                                id: IP
                            });*/
                        }
                }
                return next();
            });

            session.trap(snmp.TrapType.LinkDown, function (error) {
                if (error)
                    console.error(error);
            });
        //}, 1000);

    };
};