const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const CONFIG = require("./config.json");
const PREFIX = "-";
const client = new Discord.Client();
client.on("ready", function(){console.log("Ready");});
client.on("message", function(message) {
    if(message.author.equals(client.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

function rng(num){
    return (Math.floor(Math.random()* Math.floor(num)));
}

var servers = {};
var fortunes = ["yes", "no", "maybe", "probably not", " not sure man", "ask again" ];
var coinside = ["Heads", "Tails"]
var normalcommands = ["help", "me", "ping", "info", "coinflip" , "no (#)"]       //add command here to add the help function
var musiccommands = [];     //for future music client


var args = message.content.substring(PREFIX.length).split(" "); //remove prefix for case statement
 
//start case statement, list of commands
switch(args[0].toLowerCase()) {          
    case "help":
            var embed = new Discord.RichEmbed()
                .setAuthor("NoBot", client.user.displayAvatarURL)
                .setDescription("Bot Alex No created to play around with node js")
                .addField("Command list",normalcommands)
                .addField("The Prefix is -")
                .setColor(0xF4F766)
            message.channel.send(embed);
            break;
        
        case "me":
            var embed = new Discord.RichEmbed()
                .setThumbnail(message.author.avatarURL)
                .addField("Look it's you!", "nononono")
            message.channel.send(embed);
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

        case "no":  //spams no
            let nomessage = "no ";
            let counter = message.content.substring(3);
            if(counter > 0 && counter < 601){
                for(let i=0;i<counter-1;i++){
                    nomessage = nomessage+ "no "
                }
            }
            else{
                message.channel.send("Invalid parameters sent in, only 1-600, ex: -no 5")
                break;
            }
            message.channel.send(nomessage);
            break;
        default:
            message.channel.send("Not a valid command");
    }
});

client.login(CONFIG.TOKEN);
