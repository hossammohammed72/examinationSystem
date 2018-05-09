var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var register = require('./routes/register.js');
var app = express();
var db = require('./database.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({secret : 'hush'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
function checkSignIn(req, res,next){
  if(req.session.userId){
     next();     //If session exists, proceed to page
  } else {
    res.redirect('/login');
     console.log(req.session.user);  //Error, trying to access unauthorized page!
  }
}
function checkForRegister(req,res,next){
  if(!req.session.userId){
    next();
  }else{
     req.redirect('/');
  }
}
app.get('/register', checkForRegister, function(req, res){
  res.render('register');
});
app.post('/register', checkForRegister, register);
app.get('/', checkSignIn, function(req, res){
  res.render('index', {id: req.session.userId});
});

app.get('/login', function(req, res){
  console.log(req.session);
  res.render('login');
}); 

app.post('/login', function(req, res){

  if(!req.body.email || !req.body.psw || !req.body.userType){
     res.render('login', {message: "Please make sure there aren't any missing fields"});
  } else {
    console.log(req.body);
     db.query("SELECT * FROM `"+req.body.userType+"`WHERE email='"+req.body.email+"' and password='"+req.body.psw+"'",function(error,result){
     console.log(result);
      if(result.length ==1){
      req.session.loggedIn = true; 
      req.session.userType = req.body.userType ;
      console.log(result);
      req.session.userId = result[0].id;
      res.redirect('/');
      }else{
      res.render('login', {message: "Invalid credentials!"});
     }  
     }); 
    
     
  }
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect('/login');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(typeof req.session.userId=='undefined')
  res.redirect('/login');
  else {
    res.send('404 not found');
  }
});


module.exports = app;
