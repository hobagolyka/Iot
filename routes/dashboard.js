var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');
var authMW = require('../middleware/generic/auth');

module.exports = function (app) {

    /**
     * Main page
     */
    app.use('/dashboard',
        authMW(),
        getdataMW(),
        renderMW('dashboard', 'Dashboard')
    );

    /**
     * Map
     */
    app.use('/map',
        authMW(),
        getdbdataMW(),
        renderMW('map', 'Map')
    );
    
    /**
     * Admin
     */
    app.use('/admin',
        authMW(),
        renderMW('admin_page', 'Admin')
    );

    /**
     * search
     */
    app.use('/search',
        authMW(),
        renderMW('search', 'Keresés')
    );
};
