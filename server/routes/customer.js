const express = require("express");
const router = express.Router();
const axios = require("axios");
// guser => github_user

const hostname = "https://api.github.com";
router.get("/guser/:guser/general", (req, res) => {
	const { guser } = req.params;
	axios
		.get(`${hostname}/users/${guser}`)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/guser/:guser/repos", (req, res) => {
	axios.get(`${hostname}/`);
});
module.exports = router;
