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

// Retrieve a single user from the database.
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, data) => {
    if (err) {
      if (err.kind === Constants.ERROR_CODES.NOT_FOUND) {
        res.status(Constants.ERROR_CODES.NOT_FOUND).send({
          message: `Not found User with id ${id}.`
        });
      } else {
        res.status(Constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({
          message: `Error retrieving User with id ${id}`
        });
      }
    } else res.send(data);
  });
};

// Add a new user to the database.
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(Constants.ERROR_CODES.BAD_REQUEST).send({
      message: Constants.ERROR_CODES.EMPTY_CONTENT
    });
  }

  // Create a user
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(Constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || Constants.ERROR_CODES.DEFAULT_ERROR_MESSAGE
      });
    else res.send({status:Constants.STATUS_CODES.OK,data: data});
  });
};

// Update a user in the database.
exports.update = (req, res) => {
  if (!req.body) {
    res.status(Constants.ERROR_CODES.BAD_REQUEST).send({
      message: Constants.ERROR_CODES.EMPTY_CONTENT
    });
  }

  const id = req.params.id;

  User.updateById(
    id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === Constants.ERROR_CODES.NOT_FOUND) {
          res.status(Constants.ERROR_CODES.NOT_FOUND).send({
            message: `Not found User with id ${id}.`
          });
        } else {
          res.status(Constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({
            message: `Error updating User with id ${id}`
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user from the database.
exports.delete = (req, res) => {
  const id = req.params.id;

  User.remove(id, (err, data) => {
    if (err) {
      if (err.kind === Constants.ERROR_CODES.NOT_FOUND) {
        res.status(Constants.ERROR_CODES.NOT_FOUND).send({
          message: `Not found User with id ${id}.`
        });
      } else {
        res.status(Constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({
          message: `Could not delete User with id ${id}`
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
