const auth = async (req, res, next) => {
	// 从请求头里取出 token
	const token = req.headers.authorization.split(" ")[1];
	// token 验证取得 用户 id
	const { id } = jwt.verify(token, SECRET);
	// 查询用户
	const sql = `select * from user where id='${id}'`;
	exec(sql).then((result) => {
		next();
		// 返回用户信息
		res.send(result[0]);
	});
};

module.exports = auth;
