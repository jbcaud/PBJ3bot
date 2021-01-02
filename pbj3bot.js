const tmi = require('tmi.js');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const http = require('http');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Define configuration options
//obtained from env file
const opts = {
  identity: {
    username: process.env.user,
    password: process.env.oauth
  },
  channels: [
    process.env.channel
  ]
};

// Create a client with our options
const client = new tmi.client(opts);
getAuth();
setTimeout(()=>{
  useAPI();
},1000);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//instantiate variables to be used
var min = 1000 * 60, timesExecuted = 0, numMessages = 0;
var printOnly = new Map();
this.qotd, this.so;
global.auth;
//send the timed messages every 15 minutes
setInterval(timedMessage, 15 * min);

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  numMessages++;//keep track of messages for timer
  if (self) { return; } // Ignore messages from the bot
  if (!msg.startsWith('!')) {return;} //Ignore messages that aren't commands

  // Remove whitespace from chat message
  var split = msg.split(" ");
  const commandName = split[0];
  
  //set up map of "print only" commands
  setUp(printOnly, context, split);

  //command is print only
  if (printOnly.has(commandName)){
    //uses the user's username in message
    if (printOnly.get(commandName).cont != null){
      client.say(target, printOnly.get(commandName).cont+printOnly.get(commandName).message);
    }//end of if
    //basic print
    else{
      client.say(target, printOnly.get(commandName).message);
    }//end of else
  }//end of if

  //commands below require further action on this side (extra functions, etc.)
  else if (commandName == '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }//end of else if
  else if (commandName == '!setqotd'){
    //make sure it is used by owner
    if (context.username != process.env.channel) {return;}
    var day = split[1];//sets day to be used in readQOTD
    readQOTD(day);
  }//end of else if
  //unknown command 
  else{
    console.log(`* Unknown command ${commandName}`);
  }//end of else
}//end of onMessageHandler

//Called at selected intervals of time
function timedMessage(){
  //only execute if 5 comments have been made since last message
  if (numMessages < 5) {return;}
  //first message (follow)
  if (timesExecuted % 2 == 0){
    //output message and change track var
    client.say(opts.channels[0], 'If you are enjoying the stream, follow us so you can know when we go live!');
    timesExecuted++;
  }//end of if
  //second message (points)
  else{
    //output message and change track var
    client.say(opts.channels[0], 'This channel uses PBJ Points! You earn PBJ Points for watching, following, and other actions. Use !pbj to learn more!');
    timesExecuted++;
  }//end of else
  numMessages = 0;
}//end of timedMessage

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

//sets up the map of print only functions
//this map has the command name as the key, and has an array of the context and the message to be printed
function setUp(map, context, split){
  map.set('!lurk', {cont: context.username, message: ' is now lurking. Thanks for being here, I hope you stay cozy! peepoBlanket'});
  map.set('!pbj', {cont: null, message: 'This channel uses PBJ Points! You earn PBJ Points for watching, following, and other actions. You can use these for certain things such as gambling (!gamble {value}) and playing the slot machine (!slots {value}). At the end of the month, whoever has the most loyalty points will get a gift sub once I earn affiliate!'});
  map.set('!twitter', {cont: null, message: 'Follow me on Twitter: https://twitter.com/' + process.env.channel});
  map.set('!qotd', {cont: null, message: 'Question of the day: ' + this.qotd});
  map.set('!so', {cont: null, message: 'Check out ' + split[1] + ', they are a great content creator! Visit their channel here: https://twitch.tv/' + split[1]});
}// end of setUp

//function that reads the QOTD file and sets qotd to the correct line
function readQOTD(day){
  fs.readFile('qotd.txt', 'utf-8', (err, data) => {
    var split = data.split('\n');//split by line
    qotd = split[day - 1];//read correct line
  })
}//end of readQOTD

function getAuth(){
  
  var request = new XMLHttpRequest();
  var params = '?client_id=kpgiuho4cwavzv5ndxu9ytimayryk9&client_secret=8ypn641rf38s475s0kxh294f0h8bsq&grant_type=client_credentials';
  
  request.open('POST', 'https://id.twitch.tv/oauth2/token'+params, true);
  request.setRequestHeader('client-id', 'kpgiuho4cwavzv5ndxu9ytimayryk9');
  
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      global.auth = JSON.parse(request.responseText);
    }
  };
  request.send();

  //global.auth = 0;
}

function useAPI(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.twitch.tv/helix/search/channels?query=' + process.env.channel, true);
  request.setRequestHeader('client-id', process.env.clientid);
  request.setRequestHeader('Authorization', 'Bearer ' + global.auth.access_token);
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log(request.responseText);
    }
  };
}

