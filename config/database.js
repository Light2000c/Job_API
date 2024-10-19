const mysql = require("mysql");


const pool = mysql.createPool({
    host: "",
    database: "",
    port: "",
    user: "",
    password: "",
});

pool.getConneection((err, connection) => {
    if (err) throw err;
    console.log("Connection Id => ", connection.threadId);
});