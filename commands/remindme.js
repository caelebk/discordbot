const year = 31556952000;
const day = 86400000;
const hour = 3600000;
const minute = 60000;
const second = 1000;

var users = new Set();
var dates = new Map();

module.exports = {
    name: "remindme",
    description: "Set a reminder with .remindme [amount] [minutes/hours/days], or clear/check with .remindme [clear/status]",
    execute(message, args){

        if(args.length == 1 && !users.has(message.author.id)) return message.reply("you have not requested a remindme.");
        if(args.length == 1 && args[0] == "clear") {
            users.delete(message.author.id);
            return dates.delete(message.author.id);
        } 
        if(args.length == 1 && args[0] == "status") return message.reply(
            "Reminder set to " + dates[message.author.id].toLocaleString("en-US", {timeZone: "America/Vancouver"}) + " PDT");

        if(args.length > 2) return message.channel.send("Too many inputs.");
        if(args.length < 2) return message.channel.send("Missing inputs.");
        if(isNaN(args[0])) return message.channel.send("Number not inputted.");
        if(args[0] < 0) return message.channel.send("I can't remind you in the past dumbass.");
        if(users.has(message.author.id)) 
            return message.reply("you have already requested a remindme. To clear use .remindme clear");

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
        } else {
            return message.channel.send("Invalid Input");
        }
        
        if(newTime.toLocaleString("en-US", {timeZone: "America/Vancouver"}) == "Invalid Date") 
            return message.channel.send("Invalid Date");


        message.reply("I will remind you on: " + newTime.toLocaleString("en-US", {timeZone: "America/Vancouver"}) + " PDT");
        users.add(message.author.id);
        dates[message.author.id] = newTime;

        console.log(dates);
        var reminder = setInterval(function(){
            if(!users.has(message.author.id)) { 
                message.reply("your remindme @ " + newTime.toLocaleString(
                    "en-US", {timeZone: "America/Vancouver"}) + " PDT has been canceled.");
                clearInterval(reminder);
            }
            var now = new Date();
            var remainingTime = newTime - now.getTime();
            if(remainingTime <= 0) {
                message.channel.send("<@" + message.author.id + "> reminder!");
                dates.delete(message.author.id);
                users.delete(message.author.id);
                clearInterval(reminder);
            }
        }, 1000)

    }
}

