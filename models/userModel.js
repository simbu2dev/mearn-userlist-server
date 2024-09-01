const sql = require("./db.js");

// constructor
const User = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
};

User.getAll = (username, result) => {
    let query = "SELECT * FROM users";

    if (username) {
        query += ` WHERE username LIKE '%${username}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

module.exports = User;
