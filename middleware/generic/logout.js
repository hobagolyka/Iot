module.exports = function () {

    return function (req, res, next) {
        req.session.userid = undefined;
        return next();
    };

};
