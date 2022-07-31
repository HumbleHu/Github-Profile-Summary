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
	const { guser } = req.params;
	var repos = [];
	var res = [];
	axios
		.get(`${hostname}/users/${guser}/repos`)
		.then((result) => {
			repos = result.data;
			repos.forEach((repo) => {
				var repo_obj = new Object();
				repo_obj.name = repo.name;
				repo_obj.stars = repo.stargazers_count;
				res.push(repo_obj);
			});
			// console.log(res);
			res.sort(function (a, b) {
				return a.stars - b.stars;
			});
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
