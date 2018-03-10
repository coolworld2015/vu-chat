var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/build/index.html');
    res.send('It is just API Server...');
});

app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//------------------------------------------------------------------------
var Users = require('./users').Users;

app.get('/api/users/get', Users.getUsers);
app.post('/api/users/find', Users.findPostUser);
app.get('/api/users/findByName/:name', Users.findByName);

app.post('/api/users/add', Users.addUser);
app.post('/api/users/update', Users.updateUser);
app.post('/api/users/delete', Users.removeUser);

app.get('/api/users/drop', Users.removeAllUsers);

//------------------------------------------------------------------------
var mongoAudit = require('./audit').Audit;

app.get('/api/audit/get', mongoAudit.getAudit);
app.post('/api/audit/add', mongoAudit.addAudit);