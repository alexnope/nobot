//add music play features and fun features
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const TOKEN = //token here
const PREFIX = "/no";
var bot = new Discord.Client();
bot.on("ready", function(){console.log("Ready");});
bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

function rng(num){
    return (Math.floor(Math.random()* Math.floor(num)));
}

var servers = {};
var fortunes = ["yes", "no", "maybe", "probably not", " not sure man", "ask again" ];
var coinside = ["Heads", "Tails"]
var normalcommands = ["help", "me", "ping", "info", "coinflip"]       //add command here to add the help function
var musiccommands = [];


var args = message.content.substring(PREFIX.length).split(" ");
 
//start case statement, list of commands
switch(args[0].toLowerCase()) {          
    case "help":
            var embed = new Discord.RichEmbed()
                .setAuthor("NoBot","https://imgur.com/kYHlzm8")
                .addField("Command list",normalcommands)
                .setColor(0xF4F766)
            message.channel.send({embed});
            break;
        
        case "me":
            var embed = new Discord.RichEmbed()
                .setThumbnail(message.author.avatarURL)
                .addField("Look it's you!", "nononono")
            message.channel.send({embed});
            break;
            
        case "ping":
            message.channel.send("*misses the swing*");
            break;
            
        case "info":
            message.channel.send("test bot-soon to be music bot");
            break;

        case "8ball":
            if(args[1])
                message.channel.send(fortunes[rng(fortunes.length)]);
            else
                message.channel.send("Sorry, invalid use of command.");
            break;

        case "coinflip":
            message.channel.send(coinside[rng(2)]);
            break;


        default:
            message.channel.send("Not a valid command");
    }
});

bot.login(TOKEN);
