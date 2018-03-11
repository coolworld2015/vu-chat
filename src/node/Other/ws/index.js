'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 3000;

const server = express()
	.get('/',(req, res) => res.sendFile(__dirname + '/build/index.html'))
	.get('/style.css',(req, res) => res.sendFile(__dirname + '/build/style.css'))
	.get('/bundle.js',(req, res) => res.sendFile(__dirname + '/build/bundle.js'))
	.get('/logo.jpg',(req, res) => res.sendFile(__dirname + '/build/logo.jpg'))
	
	.get('/api/items/get', (req, res) => res.send('Items...'))	
	.get('/api/audit/get', (req, res) => res.send('Audit...'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const webSocketServer = new SocketServer({ server });
const clients = {};

webSocketServer.on('connection', (ws) => {
	var id = +new Date();
	clients[id] = ws;
	console.log('new connection ' + id);
	
	var timeID = setInterval(function() {
		ws.send('still alive', function() {  })
	}, 30000)

	ws.on('close', function() {
		console.log('connection closed ' + id);
		delete clients[id];
	});

	ws.on('message', function(message) {
		console.log('message received ' + message);
		for (var key in clients) {
			clients[key].send(message);
			//this.send(message);
		}
	});  
});
 