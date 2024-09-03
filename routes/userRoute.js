module.exports = app => {

    const users = require("../controllers/userController.js");

    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Add a new User
    router.post("/", users.create);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};