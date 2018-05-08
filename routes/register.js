var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../database.js');

/* GET home page. */
router.post('/', function(req, res, next) {
  var user = [];  
  user.name = req.body.name; 
  user.email = req.body.email; 
  user.psw = req.body.psw;
  user.ssn = req.body.ssn;
  var count; 
  var sql = "SELECT COUNT(*) as numEmployees FROM employee WHERE email='"+user.email+"' OR ssn ='"+user.ssn+ "'";
  db.query(sql,function(error,results){
    console.log(results);
    count = results[0].numEmployees; 
  if(results[0].numEmployees > 0 ){
    res.render('register',{errmsg:'it looks like you\'re already register. please login'});
    res.end('5lst');
  }
  });
  if(count ==0){
   sql = "INSERT INTO employee (`name`,`email`,`password`,`SSN`) VALUES ('"+user.name+"','"+user.email+"','"+user.psw+"','"+user.ssn+"')";
  db.query(sql, function (err, result) {
    if (err) {throw err;}else{

    }
      console.log("1 record inserted");
    });
    

  res.end('tmam kda');

}
});


module.exports = router;
