const User = require("../models/userModel.js");
const Constants = require("../config/constants.js");

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
    const username = req.query.username;
  
    User.getAll(username, (err, data) => {
      if (err)
        res.status(Constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({
          message:
            err.message || Constants.ERROR_CODES.DEFAULT_ERROR_MESSAGE
        });
      else res.send(data);
    });
  };
