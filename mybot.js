const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const ticker = "https://api.coinmarketcap.com/v1/ticker/";
const prefix = "!";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

client.on("message", (message) => {
  	 if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

 	if (command === 'c') {
 		var coin = args[0];
 		
 		var xhr = new XMLHttpRequest();
		xhr.open('GET', ticker + coin, true);
		xhr.send();
 
		xhr.onreadystatechange = processRequest;
		function processRequest(e) {
    		if (xhr.readyState == 4 && xhr.status == 200) {
        		var response = JSON.parse(xhr.responseText);
        		console.log(response[0].name);
        		message.channel.send(response[0].name);
        		message.channel.send(response[0].symbol);
        		message.channel.send(response[0].price_usd);
        		message.channel.send(response[0].price_btc);
        		message.channel.send(response[0].percent_change_1h);
        		
    		}
		}
  	}
  });
  
  		
  		



	
  

client.login(config.token);