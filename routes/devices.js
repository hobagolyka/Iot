var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');
var authMW = require('../middleware/generic/auth');
var deleteMW = require('../middleware/data/delete');
var redirectMW = require('../middleware/generic/redirect');
var addMW = require('../middleware/data/addDevice');
var getdeviceMW = require('../middleware/data/getDevice');
var runsnmpMW = require('../middleware/snmp/runSnmp');
var snmpwalkMW = require('../middleware/snmp/GetData');
var pingMW = require('../middleware/discovery/fping');
var pingallMW = require('../middleware/discovery/pingaround');
var nsMW = require('../middleware/discovery/ns');

module.exports = function (app) {
    /**
     * Devices
     */
    app.use('/devices',
        authMW(),
        getdbdataMW(),
       // pingallMW(),
        renderMW('devices', 'Devices')
    );

    /**
     * Add device to database
     */
    app.use('/add_device',
        authMW(),
        addMW(),
        redirectMW('/devices')
    );
    
    app.use('/detail/:id/snmpwalk',
        //authMW(),
        getdeviceMW(),
        snmpwalkMW(),
        renderMW('snmpwalk', 'Device detail')
    );
    
    /**
     * Detail
     */
    app.use('/detail/:id',
        authMW(),
        getdeviceMW(),
        runsnmpMW(),
        pingMW(),
        //nsMW(),
        renderMW('detail', 'Device detail')
    );

    /**
     * Add new device
     */
    app.use('/new_device',
        authMW(),
        renderMW('new_device', 'Add new deivce')
    );
    
    /**
     * Delete device
     */
    app.use('/delete/:id',
        authMW(),
        deleteMW(),
        redirectMW('/devices')
    );
};
