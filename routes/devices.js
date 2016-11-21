var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');
var authMW = require('../middleware/generic/auth');
var deleteMW = require('../middleware/data/delete');
var redirectMW = require('../middleware/generic/redirect');
var addMW = require('../middleware/data/addDevice');

module.exports = function (app) {
    /**
     * Devices
     */
    app.use('/devices',
        authMW(),
        getdbdataMW(),
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

    /**
     * Detail
     */
    app.use('/detail/:id',
        authMW(),
        renderMW('device_detail', 'Device detail')
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
