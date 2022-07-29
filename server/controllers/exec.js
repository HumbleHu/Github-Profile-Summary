//executing sql command
const con = require("../routes/con");

const exec = (sql) => {
	const promise = new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
	return promise;
};

module.exports = exec;
