var renderMW = require('../middleware/generic/render');
var redirectMW = require('../middleware/generic/redirect');
var loginMW = require('../middleware/generic/login');
var inverseMW = require('../middleware/generic/inverseAuth');
var logoutMW = require('../middleware/generic/logout');

module.exports = function(app) {
   app.get('/',
       redirectMW('/devices')
   );

   app.use('/login',
       inverseMW(),
       loginMW(),
       renderMW('login', 'title')
   );

   app.get('/logout',
       logoutMW(),
       function(req, res, next){
          res.redirect('/');
       }
   );
};