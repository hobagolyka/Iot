var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');
var authMW = require('../middleware/generic/auth');
var searchMW = require('../middleware/data/search');
var activeMW = require('../middleware/data/getActive');
var inactiveMW = require('../middleware/data/getInactive');

module.exports = function (app) {
    
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
    app.use('/search/:page',
        authMW(),
        searchMW(),
        renderMW('search', 'Keresés')
    );

    /**
     * active
     */
    app.use('/list_actives',
        authMW(),
        activeMW(),
        renderMW('active', 'Aktív')
    );

    /**
     * inactive
     */
    app.use('/list_inactives',
        authMW(),
        inactiveMW(),
        renderMW('inactive', 'Aktív')
    );
};
