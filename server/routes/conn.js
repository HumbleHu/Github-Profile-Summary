const mysql = require("mysql");
// 数据库配置
// 我是利用 sqlyog 可视化工具建立的数据库 并且建立相应的表 user
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Adam20030808!",
	port: 3306,
	database: "github-summary",
});

module.exports = conn;
