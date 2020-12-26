const tmi = require('tmi.js');
const dotenv = require('dotenv');
dotenv.config();

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

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//instantiate variables to be used
var time = new Date().getTime();
var min = 1000 * 60, timetr = 0;

//send the timed messages every 15 minutes
setInterval(timedMessage, 15 * min);

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }//end of if
  else if (commandName === '!lurk') {
    client.say(opts.channels[0], context.username + ` is now lurking. Thanks for being here, I hope you stay cozy! peepoBlanket`);
    console.log(`* Executed ${commandName} command`);
  }//end of if
  //unknown command 
  else{
    console.log(`* Unknown command ${commandName}`);
  }//end of else
}//end of onMessageHandler

//Called at selected intervals of time
function timedMessage(){
  //first message (follow)
  if (timetr == 0){
    //output message and change track var
    client.say(opts.channels[0], 'If you are enjoying the stream, follow us so you can know when we go live!');
    timetr = 1;
  }//end of if
  //second message (points)
  else{
    //output message and change track var
    client.say(opts.channels[0], 'This channel uses PBJ Points! You earn PBJ Points for watching, following, and other actions. Use !pbj to learn more!');
    timetr = 0;
  }//end of else
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