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
       renderMW('asd', 'devices')
   );
};
