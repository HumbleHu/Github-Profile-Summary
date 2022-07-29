const express = require("express");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
const exec = require("./controllers/exec");
const app = express();

const SECRET = require("./controllers/SECRET");
const port = 3000;

// 解析 post 请求体
app.use(bodyParser.json({ limit: "1mb" })); //body-parser 解析json格式数据
app.use(
	bodyParser.urlencoded({
		//此项必须在 bodyParser.json 下面,为参数编码
		extended: true,
	})
);

app.post("/register", (req, res) => {
	const username = req.body.username;
	// 密码进行加密
	const password = bcrypt.hashSync(req.body.password, 10);
	const sql = `insert into user (username, password) values ('${username}', '${password}')`;
	exec(sql).then((result) => {
		return;
	});
	res.send("用户注册成功");
});

app.post("/login", (req, res) => {
	// 从请求中获取请求体
	const { username, password } = req.body;
	const sql = `select * from user where username='${username}'`;
	exec(sql).then((result) => {
		const user = result[0];
		// 如果查询不到用户
		if (!user) {
			res.send("用户名不存在");
			return;
		}
		// 判断用户输入的密码和数据库存储的是否对应 返回 true 或者 false
		const isPasswordValid = bcrypt.compareSync(password, user.password);
		if (!isPasswordValid) {
			res.send("密码错误");
			return;
		}
		// 生成 token 将用户的唯一标识 id 作为第一个参数
		// SECRET 作为取得用户 id 密匙
		const token = jwt.sign({ id: user.id }, SECRET);
		// 如果都通过了 则返回user 和 token
		// 返回的 token 应该存储在客户端 以便后续发起请求需要在请求头里设置
		res.send({ user, token });
	});
});

const customer = require("./routes/customer");
const auth = require("./controllers/auth");
app.use("/customer", auth, customer);

app.listen(port, () => {
	console.log("listening on:", port);
});
