var renderMW = require('../middleware/generic/render');
var getdataMW = require('../middleware/snmp/GetData');
var getdbdataMW = require('../middleware/data/getData');

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
       renderMW('asd', 'dashboard')
   );

   /**
    * Add new device
    */
   app.use('/new_device',
       renderMW('asd', 'new_device')
   );

   /**
    * Devices
    */
   app.use('/devices',
       getdbdataMW(),
       renderMW('asd', 'devices')
   );

   /**
    * Map
    */
   app.use('/map',
       getdbdataMW(),
       renderMW('Map', 'map')
   );
};
