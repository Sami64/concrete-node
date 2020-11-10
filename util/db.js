const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "devuser",
  database: "node_concrete",
  password: 'gamefreak6464'
});


exports.db = pool.promise();
