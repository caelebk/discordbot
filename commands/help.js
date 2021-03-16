module.exports = {
    name: 'help',
    description: "Lists all the bot commands",
    execute(message,args,client) {
        var keys = Array.from(client.commands.keys());
        var descriptions = Array.from(client.commandDescriptions.keys());
        var msg = "Current Commands:\n";
        var help = keys.indexOf("help");
        msg += "**." + keys[help] +"** - "+ descriptions[help]+"\n";
        for(var x = 0; x < keys.length; x++) {
            if(x!=help)
                msg += "**."+keys[x]+"** - " +descriptions[x] +"\n";
        }
        message.reply(msg);
    }
}