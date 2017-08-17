const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
// const data = [{username:"kitty", password:"unicorn"}]


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(function (req, res, next) {
  console.log('in interceptor');
  next()
})

app.get('/', function(req, res) {
console.log("first route");
  res.render('login')

})

app.post('/login',function(req,res){
// route corresponds with the action part on the form in the mustache file
console.log("username is " +req.body.username);
console.log("password is " +req.body.password);
res.render('home')
})
// naming agents username and password come from the name attributes in the mustache html

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
