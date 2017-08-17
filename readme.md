
FOR THE INTERCEPTOR
if req.url == '/login'
next ()
else if !req.session.username
res.render('login')
else
next()

in the POST
loop through array to match username and password
if find match, then set req.session.login = true
req.session.username = req.body.username
res.render('home')
else
if no match,
render login page w/ error message
res.rend('login', pass error message to mustache)


Validation:
error message:
