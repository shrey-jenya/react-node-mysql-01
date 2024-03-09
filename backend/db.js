const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task-manager-app",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        throw err;
    }
    console.log("Connected to task-manager-app database");
});

module.exports = db;
