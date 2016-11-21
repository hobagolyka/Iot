module.exports = function () {

    return function (req, res, next) {
        var alma = "alma";
        res.tpl.alert = false;
        
        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') || (typeof req.body.pw === 'undefined')) {
            res.tpl.alert = false;
            return next();
        }
        //lets find the user
        if (req.body.username !== alma) {
            res.tpl.alert = true;
            return next();
        }

        //check password
        if (req.body.pw !== alma) {
            res.tpl.alert = true;
            return next();
        }
        
        //login is ok, save id to session
        req.session.userid = 21452;
        //redirect to / so the app can decide where to go next
        return res.redirect('/');
    }
};