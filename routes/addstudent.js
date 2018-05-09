var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../database.js');

router.get('/', function(req, res, next) {
    res.render('addstudent');
});

router.post('/', function (req, res, next) {
    var query = "INSERT INTO `student` (`email`, `firstName`, `lastName`, `semesterId`, `password`) VALUES ('" + req.body.email + "','" + req.body.fname + "','" + req.body.lname + "','" + 1 + "','" + req.body.password+ "')";
    db.query(query, function(err, res) {
        if (err) {
            throw err;
            console.log(err);
        } else {
            console.log("1 student inserted");
        }
    });
	res.end('Added!');
});
module.exports = router;
