# PBJ3bot
This is a basic Twitch bot written in JavaScript. It utilizes Node.js and Tmi.js to connect to a streamer's chat and do actions such as execute custom commands and send timed messages.

# Frameworks and Libraries

This project is created with:

* Node.js version: 14.15.3
* Tmi.js version: 1.7.1
* npm version: 6.14.9

# Features
Right now, it has two main purposes:

### Executing Commands 

Right now, it knows a few commands, but I am currently working on expanding its library.

* !lurk
  * The bot will let the streamer know that the user who executed this command is lurking, meaning they are not actively watching every moment or participating in chat.
* !pbj
  * This gives an explanation of my channel's loyalty point system (hosted by another bot as of now), and points users in the right direction of interacting with that system.
* !qotd
  * The bot outputs the question of the day for that stream
* !setqotd {int}
  * The question of the day is read from a file set up for that week, taking the integer argument to read a certain line with the question for that specific day.
* !twitter
  * The bot outputs a message with a link to the streamer's twitter account, if it exists.
* !discord
  * The bot outputs a message with an invite link to the streamer's discord, using a custom link ending that can be set in the environment variables.
* !so {streamer username}
  * Allows the streamer to "shout out" another streamer, where the bot outputs a message containing a link to that streamer's profile.
* !uptime
  * If the streamer is currently live, the bot outputs how long that streamer has been live in hours, minutes, and seconds. This utilizes the Twitch API.
  
### Sending Timed Messages

Right now, it is set up to send multiple alternating messages in chat at a set time interval. However, I am looking into improving its functionality and allowing the streamer to have it send as many messages as they need in an efficient fashion.
