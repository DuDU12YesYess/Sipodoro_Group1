const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sipodoro_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL!");
});

module.exports = connection;