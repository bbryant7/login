const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const data = [{username:"kitty", password:"unicorn"}]


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  console.log('in interceptor');
  if (req.url === '/login') {
    next()
  } else if (!req.session.username) {
    res.render('login')
  } else {
    next()
  }
})

app.get('/', function(req, res) {
  console.log("first route");
  res.render('home')
})

app.post('/login',function(req,res){
// route corresponds with the action part on the form in the mustache file
  // console.log("username is " +req.body.username);
  // console.log("password is " +req.body.password);

  for (var i = 0; i < data.length; i++) {
    if (req.body.username === data[i].username && req.body.password === data[i].password){
      req.session.username = req.body.username
      res.render('home')
    }else{
      // req.checkBody('username', 'Incorrect username or password').notEmpty()
      // let error = req.validationErrors();
      res.render('login',{error:"Invalid username or password"})
      // console.log(validationErrors);

    }


}
})
// naming agents username and password come from the name attributes in the mustache html

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
