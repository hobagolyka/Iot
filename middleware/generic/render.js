module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        res.tpl.active = viewName;
        res.render(viewName, res.tpl);
    };

};