//executing sql command
const conn = require("../routes/conn");

const exec = (sql) => {
	const promise = new Promise((resolve, reject) => {
		conn.query(sql, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
	return promise;
};

module.exports = exec;
