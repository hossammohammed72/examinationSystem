var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res.session);
  if(res.session.loggedin){
  res.send('respond with a resource');
  }else{
    res.redirect('/login');

  }
});

module.exports = router;
