module.exports = app => {

    var router = require("express").Router();

    app.use('/api/users', router);
};