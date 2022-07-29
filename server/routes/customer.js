const express = require("express");
const router = express.Router();
const axios = require("axios");
// guser => github_user

const hostname = "api.github.com";
router.get("/guser/:guser", (req, res) => {
	axios
		.get("https://api.github.com/users/Adamyang1")
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
});
module.exports = router;
