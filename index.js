const Discord = require("discord.js");
const CONFIG = require("./config.json");
const PREFIX = "-";
const client = new Discord.Client();
client.on("ready", function(){console.log("Ready");});
client.on("message", function(message) {
    if(message.author.equals(client.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

function rng(num){      // random number generator function, 0,input
    return (Math.floor(Math.random()* Math.floor(num)));
}

var servers = {};
var fortunes = ["yes", "no", "maybe", "probably not", " not sure man", "ask again" ];   //list of fortunes
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
                nomessage.repeat(counter-1);
            }
            else{
                message.channel.send("Invalid parameters sent in, only 1-600, ex: -no 5")
                break;
            }
            message.channel.send(nomessage);
            break;

        case "spam":
            let parameter = message.content.substring(PREFIX.length+4); //takes the command and removes the -spam
            parameter = parameter.split(" ");                           //splits up the parameters into parameter[0], parameter[1]
                                                                        //parameter0 is the word wanted to spam and parameter[1] is the amount of times up to 600
            let spammessage = parameter[1];                             //add some protection
            for(let i=0;i<(parameter[2]-1);i++){
                spammessage = spammessage + " " + parameter[1];
            }
            message.channel.send(spammessage);
            break;
        default:
            message.channel.send("Not a valid command");
    }
});

client.login(CONFIG.TOKEN);
