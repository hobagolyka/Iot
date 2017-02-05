var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');
var authMW = require('../middleware/generic/auth');
var searchMW = require('../middleware/data/search');
var activeMW = require('../middleware/data/getActive');
var inactiveMW = require('../middleware/data/getInactive');
var getuserMW = require('../middleware/user/getUser');
var updateuserMW = require('../middleware/user/updateUser');
var redirectMW = require('../middleware/generic/redirect');

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
        getuserMW(),
        renderMW('admin_page', 'Admin')
    );

    /**
     * Admin
     */
    app.use('/new_password',
        authMW(),
        updateuserMW(),
        redirectMW('/devices')
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
