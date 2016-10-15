var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var setactiveMW = require('../middleware/generic/SetActive');

module.exports = function (app) {
    /**
     * Login page
     */
    app.use('/login',
        renderMW('asd', 'login')
    );

    /**
     * Main page
     */
    app.use('/dashboard',
        getdataMW(),
        setactiveMW('dashboard'),
        renderMW('asd', 'dashboard')
    );
    
    /**
     * Add new device
     */
    app.use('/devices/new_device',
        setactiveMW('new_device'),
        renderMW('asd', 'new_device')
    );
    
    /**
     * Devices
     */
    app.use('/devices',
        setactiveMW('devices'),
        renderMW('asd', 'devices')
    );
};
