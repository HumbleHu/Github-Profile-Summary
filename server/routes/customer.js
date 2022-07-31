const express = require("express");
const router = express.Router();
const axios = require("axios");
const token = require("../controllers/token");
const getCommits = require("../controllers/getCommits");
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

//stars per repo
router.get("/guser/:guser/repos/stars", (req, res) => {
	const { guser } = req.params;
	var repos = [];
	var reposSortedByStar = [];
	axios
		.get(`${hostname}/users/${guser}/repos`, {
			headers: {
				Authorization: "token " + token, //得要有这玩意才能一个小时访问5000+次
			},
		})
		.then((result) => {
			repos = result.data;
			repos.forEach((repo) => {
				// console.log(repo);
				var repObject = new Object();
				repObject.name = repo.name;
				repObject.stars = repo.stargazers_count;
				repObject.url = repo.html_url;
				reposSortedByStar.push(repObject);
			});
			// console.log(res);
			reposSortedByStar.sort(function (a, b) {
				return b.stars - a.stars;
			});
			res.send(reposSortedByStar.slice(0, 10));
		})
		.catch((err) => {
			console.log(err);
		});
});

//commits per repo
router.get("/guser/:guser/repos/commits", async (req, res) => {
	const { guser } = req.params;
	var repos = [];
	var reposSortedByCommit = [];
	axios
		.get(`${hostname}/users/${guser}/repos`, {
			headers: {
				Authorization: "token " + token, //得要有这玩意才能一个小时访问5000+次
			},
		})
		.then(async (result) => {
			repos = result.data;
			reposSortedByCommit = await getCommits(repos, guser);
			reposSortedByCommit.sort(function (a, b) {
				return b.commit - a.commit;
			});
			res.send(reposSortedByCommit.slice(0, 10));
		})
		.catch((err) => {
			console.log(err);
		});
});
module.exports = router;
