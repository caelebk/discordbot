const message = require("../events/message");

const year = 31556952000;
const day = 86400000;
const hour = 3600000;
const minute = 60000;
const second = 1000;

module.exports = {
    name: "remindme",
    description: "Reminds you in x amount of days .remindme [amount] [minutes/hours/days]",
    execute(message, args){
        if(args.length > 2) return message.channel.send("Too many inputs.");
        if(args.length < 2) return message.channel.send("Missing inputs.");
        if(isNaN(args[0])) return message.channel.send("Number not inputted.");
        if(args[0] < 0) return message.channel.send("I can't remind you in the past dumbass.");
        let time = new Date();
        console.log(time.toLocaleString("en-US", {timeZone: "America/Vancouver"}));

        let newTime = new Date();
        var input = args[1].toLowerCase();
        var milli;
        if(input == "seconds" || input == "second" || input == "sec") {
            newTime.setTime(time.getTime() + args[0] * second);
            milli = args[0] * second;
        } else if(input == "minutes" || input == "minute" || input == "min") {
            newTime.setTime(time.getTime() + args[0] * minute);
            milli = args[0] * minute;
        } else if(input == "hours" || input == "hour") {
            newTime.setTime(time.getTime() + args[0] * hour);
            milli = args[0] * hour;
        } else if(input == "days" || input == "day") {
            newTime.setTime(time.getTime() + args[0] * day);
            milli = args[0] * day;
        } else if(input == "year" || input == "years") {
            newTime.setTime(time.getTime() + args[0] * year);
            milli = args[0] * year;
        }
        
        if(newTime.toLocaleString("en-US", {timeZone: "America/Vancouver"}) == "Invalid Date") return message.channel.send("Invalid Date");
        console.log(newTime.toLocaleString("en-US", {timeZone: "America/Vancouver"}));
        message.reply("I will remind you on: " + newTime.toLocaleString("en-US", {timeZone: "America/Vancouver"}) + " PDT");
        var reminder = setInterval(function(){
            var now = new Date();
            var remainingTime = newTime - now.getTime();
            if(remainingTime <= 0) {
                message.channel.send("<@" + message.author.id + ">");
                clearInterval(reminder);
            }
        }, 1000)
    }
}

