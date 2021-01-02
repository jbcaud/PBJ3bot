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

Right now, it only knows a few commands, but I am currently working on expanding its library.

* !lurk
  * The bot will let the streamer know that the user who executed this command is lurking, meaning they are not actively watching every moment or participating in chat.
* !pbj
  * This gives an explanation of my channel's loyalty point system (hosted by another bot as of now), and points users in the right direction of interacting with that system.
* !qotd
  * The bot outputs the question of the day for that stream
* !setqotd {int}
  * The question of the day is read from a file set up for that week, taking the integer argument to read a certain line with the question for that specific day.
  
### Sending Timed Messages

Right now, it is set up to send two alternating messages in chat at a set time interval. However, I am looking into improving its functionality and allowing the streamer to have it send as many messages as they need in an efficient fashion.
