const Discord = require("discord.js");
const CONFIG = require("./config.json");
const PREFIX = "-";
const client = new Discord.Client();
var rngbool = true;
//Ready Message
client.on("ready", function(){console.log("Ready");});  //if success bot will say readys

//Client is recieving messages
client.on("message", function(message) {
    if(message.author.equals(client.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

//my functions
function pickrandom(listofpeople){      
    listofpeople = listofpeople.split(" ");     //make a way to do this with tags instead of just names
    return listofpeople[myrng(0,listofpeople.length)];
}
function myrng(range1,range2){   //creating own random number generator
    let TIME = process.hrtime();  //grab cpu time
    let number;
    let randomseed;
    if(rngbool == true){
        randomseed = (TIME[1]*TIME[0]);   //take the nano sec * the normal sec
        number = (randomseed % range2) + range1;
        rngbool = !rngbool;
    }
    else{
        randomseed = (TIME[1] * TIME[1]);
        number = (randomseed % range2) + range1;
        rngbool = !rngbool;
    }
    return number;   //test print
    
}

//variables used throughout
var servers = {};
var fortunes = ["yes", "no", "maybe", "probably not", "probably", " not sure man", "ask again" ];
var coinside = ["Heads", "Tails"]
var cornside = ["Cob","Kennel"]
var normalcommands = ["8ball", "coinflip", "lottery"]       //add command here to add the help function

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
            
        case "info":
            message.channel.send("Bot specifically made for random commands");
            break;

        case "8ball":
            if(args[1])
                message.channel.send(fortunes[myrng(0,fortunes.length)]);
            else
                message.channel.send("Sorry, invalid use of command.");
            break;

        case "coinflip":
            message.channel.send(coinside[myrng(0,2)]);
            break;
        
        case "cornflip":
            message.channel.send(cornside[myrng(0,2)]);
            break;
        case "lottery":
            let listofpeople = message.content.substring(PREFIX.length+8);
            message.channel.send(pickrandom(listofpeople));
            break;
        default:
            message.channel.send("Not a valid command");
    }
});

client.login(CONFIG.token);
