var snmp = require ("net-snmp");
var moment = require('moment');
var data = [];

module.exports = function () {

    return function (req, res, next) {
        var io = res.tpl.socket;
        var IP = res.tpl.adatok.IP;

            var session = snmp.createSession (IP, "public");

            var oid = "1.3.6.1.2.1.2.2";
            var columns = [2, 6];

            function sortInt (a, b) {
                if (a > b)
                    return 1;
                else if (b > a)
                    return -1;
                else
                    return 0;
            }

            function responseCb (error, table) {
                if (error) {
                    console.error (error.toString ());
                } else {
                    // This code is purely used to print rows out in index order,
                    // ifIndex's are integers so we'll sort them numerically using
                    // the sortInt() function above
                    var indexes = [];
                    for (index in table)
                        indexes.push (parseInt (index));
                    indexes.sort (sortInt);

                    // Use the sorted indexes we've calculated to walk through each
                    // row in order
                    for (var i = 0; i < indexes.length; i++) {
                        // Like indexes we sort by column, so use the same trick here,
                        // some rows may not have the same columns as other rows, so
                        // we calculate this per row
                        var columns = [];
                        for (column in table[indexes[i]])
                            columns.push (parseInt (column));
                        columns.sort (sortInt);

                        // Print index, then each column indented under the index
                        console.log ("row for index = " + indexes[i]);
                        for (var j = 0; j < columns.length; j++) {
                            console.log ("   column " + columns[j] + " = "
                                + table[indexes[i]][columns[j]]);
                        }
                    }
                }
            }

            var maxRepetitions = 20;

// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
            session.tableColumns (oid, columns, maxRepetitions, responseCb);
            session.trap (snmp.TrapType.LinkDown, function (error) {
                if (error)
                    console.error (error);
            });
        return next();
    };

};