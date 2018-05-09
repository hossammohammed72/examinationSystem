var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../database.js');

/* GET addquestion page. */
router.get('/', function (req, res, next) {
	var coursesQuery = "SELECT id, name from Course";
	db.query(coursesQuery, function (error, result) {
		console.log(result);
		var tag = '';
		for (var i = 0; i < result.length; i++) {
			tag += "<option value='" + result[i].id + "'>" + result[i].name + '</option> \n';
		}
		console.log(tag);
		res.render('addquestion', {
			'coursename': tag
		});
	});
});

router.post('/', function (req, res, next) {
	if (req.body.questionType == '2') {
		var insertTrueOrFalse = "INSERT INTO question (`courseId`, `type`, `mark`, `text`, `answer`) VALUES ('" + req.body.coursename + "','" + req.body.questionType + "','" + req.body.grade + "','" + req.body.question + "','" + req.body.trueorfalseselect + "')";
		db.query(insertTrueOrFalse, function (err, result) {
			if (err) {
				throw err;
				console.log(err);
			} else {
				console.log("1 true or false inserted");
			}
		});
	} else if (req.body.questionType == '1') {
		var insertComplete = "INSERT INTO question (`courseId`, `type`, `mark`, `text`, `answer`) VALUES ('" + req.body.coursename + "','" + req.body.questionType + "','" + req.body.grade + "','" + req.body.question + "','" + null + "')";
		db.query(insertComplete, function (err, result) {
			if (err) {
				throw err;
				console.log(err);
			} else {
				var latestRecordId = "SELECT id FROM question where text ='" + req.body.question + "'";
				db.query(latestRecordId, function (err, res) {
					if (err) {
						throw err;
						console.log(latestRecordId);
						console.log(err);
					} else {
						console.log(res);
						var question = req.body.question
						var answer1 = req.body.firstchoice;
						var answer2 = req.body.secondchoice;
						var answer3 = req.body.thirdchoice;
						var answer4 = req.body.fourthchoice;
						var correctChoice = parseInt(req.body.correctchoiceselect);
						console.log(correctChoice)
						var insertSelect = "INSERT INTO multipleselect (`questionId`, `choiceA`, `choiceB`, `choiceC`, `choiceD`, `answer`) VALUES ('" + res[0].id + "','" + answer1 + "','" + answer2 + "','" + answer3 + "','" + answer4 + "','" + correctChoice+ "')";
						db.query(insertSelect, function (err, result) {
							if (err) {
								throw err;
								console.log(err);
							} else {
								console.log("1 select inserted");
							}
						});
					}
				})
			}
		});
	} else {
		var insertComplete = "INSERT INTO question (`courseId`, `type`, `mark`, `text`, `answer`) VALUES ('" + req.body.coursename + "','" + req.body.questionType + "','" + req.body.grade + "','" + req.body.question + "','" + req.body.completeAnswer + "')";
		db.query(insertComplete, function (err, result) {
			if (err) {
				throw err;
				console.log(err);
			} else {
				console.log("1 complete inserted")
			}
		});
	}
	res.end('Added!');
});

module.exports = router;