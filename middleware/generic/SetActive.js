module.exports = function (active_link) {

    return function (req, res, next) {
            res.tpl.active = active_link;
        return next;
    };

};