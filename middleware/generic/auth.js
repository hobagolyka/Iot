/**
 * If the user is not logged in, redirects to /
 */
module.exports = function () {

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};
