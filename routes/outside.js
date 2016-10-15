var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');

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
    app.get('/dashboard',
        getdataMW(),
        renderMW('asd', 'dashboard')
    );
};
