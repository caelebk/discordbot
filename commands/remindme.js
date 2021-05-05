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


        let time = new Date();
        console.log(time.toString());

        let newTime = new Date();
        var input = args[1].toLowerCase();
        if(input == "seconds" || input == "second")
            newTime.setTime(time.getTime() + args[0] * second);
        else if(input == "minutes" || input == "minute") 
            newTime.setTime(time.getTime() + args[0] * minute);
        else if(input == "hours" || input == "hour") 
            newTime.setTime(time.getTime() + args[0] * hour);
        else if(input == "days" || input == "day") 
            newTime.setTime(time.getTime() + args[0] * day);
        
        console.log(newTime.toString());
        message.reply("I will remind you on: " + newTime.toString());
    }
}