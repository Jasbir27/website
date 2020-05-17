const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var admin = require('firebase-admin');
const url = require('url');
const http = require("http");;
var gamehandler = require('./gamehandler.js');
var userServices = require('./userServices.js');
let firebase=require('firebase');

var serviceAccount = require("./serviceAccountKey.json");


  firebase.initializeApp(config);


defaultDatabase = admin.database();

// defaultDatabase.ref('/users/' + 'vzCG5CYTjGeP2Q9RZq8O79SjmR63').once('value').catch(function(error) {
// 	// Handle Errors here.
// 	console.log(error);
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// ...
//   }).then(function(snapshot) {
// 	// var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// 	console.log('outside username:'+JSON.stringify(snapshot.val()));
// 	// ...
//   });


app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 6000);


var server = http.createServer();

server.listen(5000);

let globalPlayersToMatchMap={}
let globalMatchHandlers={}

console.log("len="+Object.keys(globalPlayersToMatchMap).length);

var WebSocketServer = require("ws").Server;

var wssMatcherMaker2 = new WebSocketServer({noServer: true});

var g=null;

wssMatcherMaker2.on('connection', (webSocket,request,userId) => {

	console.log("connected with "+userId);
	if(globalPlayersToMatchMap[userId])
	{
		let matchId=globalPlayersToMatchMap[userId];
		globalMatchHandlers[matchId].addConnection(webSocket,userId);
	}
	else
	{
		if(g===null || g.isFull())
		{
			while(true)
			{var min=100000; 
			var max=900000;  
			var random = Math.random() * (+max - +min) + +min;
			random=Math.floor(random);
			if(!globalMatchHandlers[random]) break;
			}
			g=Object.create(new gamehandler(globalPlayersToMatchMap,globalMatchHandlers,random,2));
		}

		g.addConnection(webSocket,userId);
	}

	
	
	// webSocket.send("aur bhai kya haal hai ?");
	// console.log("msg sent ");
	// webSocket.on('message',function(message)
	// {
	// 	console.log("msg rec from "+userId+" :"+message);
	// });
	// webSocket.on('close',function()
	// {
	// 	console.log("i am closing in connection for "+userId);
	// });
   
});



server.on('upgrade', async function upgrade(request,socket,head){

	const pathname = url.parse(request.url).pathname;
	const serarhh = request.url;
	let t=serarhh.indexOf('token=');
	var token=serarhh.substr(t+6);
	token=token.substring(-1);
	console.log('--------------------');
	console.log("pathname "+pathname);
	// await new Promise(resolve => setTimeout(resolve, 5000));

	var errorOcurred=false;
	var userId='init';
	 admin.auth().verifyIdToken(token)
		.then(function(decodedToken) {
			let uid = decodedToken.uid;
			userId=uid;
			
			if(pathname==='/matchmaker2')
			{
				wssMatcherMaker2.handleUpgrade(request, socket, head, function done(ws) {
				wssMatcherMaker2.emit('connection',  ws, request,userId);
			  });}

			}).catch(function(error) {
				socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
				socket.destroy();
				errorOcurred=true;
				console.log("error in verification-"+error);
	// Handle error
		});
	
	});
	
	


// var userId = firebase.auth().currentUser.uid;
// console.log('userId : '+userId);
















console.log("hi");