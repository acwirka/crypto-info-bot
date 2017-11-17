const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const ticker = "https://min-api.cryptocompare.com/data/";
const prefix = "!";
//var rdb = require("rdb.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/data", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

function findId(ticker) {
	MongoClient.connect("mongodb://localhost:27017/coinData", function (err, db) {
   
   			var query = { 'MTL': 1 };
  			db.collection("coinlist").find(query).toArray(function(err, result) {
    		if (err) throw err;
    		console.log("result: " + result);
    			console.dir(result);
   		
   			// db.collection("coinlist").find({ 'MTL':1}, function(err, result) {
    		// 	if (err) throw err;
    		// 	console.log("result: " + result);
    		// 	console.dir(result);
   		//var cursor = db.collection('coinlist').find( { Id : "21227" }  ).forEach(function(item){

		//console.log(item);

	});

 		

     // if(err) throw err;
     // var id = data.coinlist.find( { ticker } );
     // console.log(id);
     // return id;
                
});


}

client.on("message", (message) => {
  	 if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

 	if (command === 'c') {
 		var coin = args[0].toUpperCase();
 		console.log(coin);
 		var id = findId(coin);
 		//
 		//console.log(id);
 		// ccdb = rdb.checkCoin(coin);
 		// console.log(ccdb);


 		var coinPrice = ("price?fsym=" + coin + "&tsyms=BTC,USD");
 		var xhr = new XMLHttpRequest();
		xhr.open('GET', ticker + coinPrice, true);
		xhr.send();
 
		xhr.onreadystatechange = processRequest;
		function processRequest(e) {
    		if (xhr.readyState == 4 && xhr.status == 200) {
        		var response = JSON.parse(xhr.responseText);
        		console.log(response);
        		message.channel.send(
										{embed: {
												  color: 3447003,
												  title: coin,
												  // description: "BTC price: " + response.BTC,
												  // description: "USD price: " + response.USD
												  fields: [{
												        name: "BTC price: ",
												        value: String(response.BTC)},
												      {
												        name: "USD price: ",
												        value: String(response.USD)
												      }]
												}
										});
        			
        	
        		
    		}
		}
  	}
  });
  
  		
  		



	
  

client.login(config.token);