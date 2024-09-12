const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "upload-images-react",
});
module.exports = connection;
