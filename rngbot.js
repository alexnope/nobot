const Discord = require("discord.js");
const CONFIG = require("./config.json");
const PREFIX = "-";
const client = new Discord.Client();
const mysql = require("mysql");
//Ready Message

var con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    port: "3306",
    password: "",
    database: "rngdb"
});
con.connect(err => {
    if(err) throw err;
    console.log("Connected to database");
});


client.on("ready", async ()=> {console.log("RNGBot is Online");});  //if success bot will say readys
                                                                    //() => == function(args)
//Client is recieving messages

client.on("message", async message => {                             //shorthand for function looks better
    if(message.author.equals(client.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

//my functions
function pickrandom(listofpeople){
    listofpeople = listofpeople.split(" ");                         //make a way to do this with tags instead of just names
    return listofpeople[myrng(0,listofpeople.length)];
}
//
function myrng(range1,range2){
    //use middle square method
    let TIME = process.hrtime();                                    //grab cpu time
    let seed = TIME[1] * TIME[1];
    while(seed.length > 8){
        seed.pop();
    }
    seed = parseInt(seed.toString().substring(2,6))
    seed = (seed%range2) + range1;
    return seed;
}

function daily(){ //for daily command
  return Number(myrng(25,60));
}


//variables used throughout
var servers = {};
var fortunes = ["yes", "no", "maybe", "probably not", "probably", " not sure man", "ask again" ];
var coinside = ["Heads", "Tails"]
var cornside = ["Cob","Kennel"]
var dice = [":one:",":two:",":three:",":four:",":five:",":six:"]
var normalcommands = ["8ball", "coinflip", "lottery", "cornflip", "rolldice"]       //add command here to add the help function

var args = message.content.substring(PREFIX.length).split(" ");      //remove prefix for case statement

//start case statement, list of commands
switch(args[0].toLowerCase()) {
    case "help":
            let embed = new Discord.RichEmbed()
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

        case "rolldice":
            message.channel.send(dice[myrng(0,5)]);
            break;

        case "daily":
            con.query(`SELECT * FROM currency WHERE id ='${message.author.id}'`,(err,rows)=>{
              if(err) throw err;
              let sql;
              if(rows.length < 1){
                sql = `INSERT INTO currency (id,amount) VALUES ('${message.author.id}', ${daily()})`
              }
              else{
                let amt = rows[0].amount + daily(); //rows.amount is previous amount + daily
                sql = `UPDATE currency SET amount=${amt} WHERE id='${message.author.id}'`;
              }
              con.query(sql,console.log);
            });
            break;

        default:
            message.channel.send("Not a valid command");
    }
});

client.login(CONFIG.token);
