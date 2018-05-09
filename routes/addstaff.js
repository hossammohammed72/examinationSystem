var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../database.js');

router.get('/', function(req, res, next) {
    res.render('addstaff');
});

router.post('/', function (req, res, next) {
    var query = "INSERT INTO staff (`firstName`, `lastName`, `email`, `password`, `ssn`, `title`, `departmentId`) VALUES ('" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + req.body.password + "','" + req.body.ssn + "'," + "'Professor'," + "1)";	
    db.query(query, function(err, res) {
        if (err) {
            console.log(query);
            console.log(err);
        } else {
            console.log("1 staff member inserted");
        }
    });
	res.end('Added!');
});

module.exports = router;
