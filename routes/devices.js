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
var handle_csvMW = require('../middleware/devices/handle_csv');
var editMW = require('../middleware/devices/edit');
var updateMW = require('../middleware/data/update');

module.exports = function (app) {

    app.use('/devices/:page',
        authMW(),
        getdbdataMW(),
        // pingallMW(),
        renderMW('devices', 'Devices')
    );

    app.use('/add_device',
        authMW(),
        addMW(),
        redirectMW('/devices')
    );

    app.use('/save_changes/:id',
        authMW(),
        updateMW(),
        redirectMW('/devices')
    );
    
    app.use('/detail/:id/snmpwalk',
        //authMW(),
        getdeviceMW(),
        snmpwalkMW(),
        renderMW('snmpwalk', 'Device detail')
    );

    app.use('/detail/:id',
        authMW(),
        getdeviceMW(),
        //runsnmpMW(),
        //pingMW(),
        //nsMW(),
        renderMW('detail', 'Device detail')
    );

    app.use('/edit/:id',
        authMW(),
        getdeviceMW(),
        renderMW('edit', 'Edit device')
    );

    app.use('/new_device',
        authMW(),
        renderMW('new_device', 'Add new deivce')
    );

    app.use('/csv_upload',
        authMW(),
        renderMW('csvupload', 'Add new deivce')
    );

    app.use('/csv_data',
        authMW(),
        handle_csvMW(),
        redirectMW('/devices')
    );

    app.use('/delete/:id',
        authMW(),
        deleteMW(),
        redirectMW('/devices')
    );

};
