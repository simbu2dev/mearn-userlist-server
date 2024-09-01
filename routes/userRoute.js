module.exports = app => {

    const users = require("../controllers/userController.js");

    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", users.findAll);

    app.use('/api/users', router);
};