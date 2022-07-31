const axios = require("axios");
const hostname = "https://api.github.com";
const token = require("./token");
const Async = require("async");

async function getCommit(repo, guser) {
	return new Promise((resolve, reject) => {
		var repObject = new Object();
		var owner = repo.owner.login;
		axios
			.get(`${hostname}/repos/${owner}/${repo.name}/commits?author=${guser}`, {
				headers: {
					Authorization: "token " + token, //得要有这玩意才能一个小时访问5000+次
				},
			})
			.then((commit) => {
				repObject.name = repo.name;
				repObject.commit = commit.data.length;
				// console.log(repo.name);
				// console.log(commit.data.length);
				resolve(repObject);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}

async function getCommits(repos, guser) {
	return new Promise((resolve, reject) => {
		var commitsList = [];
		Async.map(repos, function (repo, callback) {
			Async.waterfall([
				async function (callback) {
					var temp_obj = await getCommit(repo, guser);
					commitsList.push(temp_obj);
					// console.log(temp_obj);
					// callback(null, temp_obj);
				},
				function (callback) {
					// console.log(commitsList);
					if (commitsList.length == repos.length) resolve(commitsList);
				},
			]);
		});
	});
}

module.exports = getCommits;
