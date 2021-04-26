module.exports = {
    name: "vote",
    description: "start a vote with .vote [prompt], [option1], [option2], ...",
    execute(message,args){
        if(args.length <= 1) return message.channel.send("No options were inputted");
        if(args.length == 2) return message.channel.send("Only one option was inputted");
        var vote = "**"+args[0].charAt(0).toUpperCase() + args[0].slice(1) +"?**\n\n";
        var emojiReacts = [];
        for(var x = 1; x < args.length; x++){
            if(x.toString().length < 2) {
                vote += matchEmoji(x) + " - " +args[x] +"\n\n";
                emojiReacts.push(matchEmoji(x));
            }
        }
        console.log(emojiReacts);
        vote += "Cast Votes Here:";
        console.log(vote);
        message.channel.send(vote).then(sent => {
            for(var x = 0; x < emojiReacts.length; x++) {
                sent.react(emojiReacts[x]);
            }
        });
    }
}
function matchEmoji(num){
    switch(num){
        case 1:
            return "1️⃣"
        case 2:
            return "2️⃣"
        case 3:
            return "3️⃣"
        case 4:
            return "4️⃣"
        case 5:
            return "5️⃣"
        case 6:
            return "6️⃣"
        case 7:
            return "7️⃣"
        case 8:
            return "8️⃣"
        case 9:
            return "9️⃣"
        case 10:
            return "🔟"
        default:
            return "❌"
    }
}