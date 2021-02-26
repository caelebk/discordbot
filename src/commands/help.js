module.exports = {
    name: 'help',
    description: "Lists all the bot commands",
    execute(message,args,client) {
        var keys = Array.from(client.commands.keys());
        var descriptions = Array.from(client.commandDescriptions.keys());
        var msg = "Current Commands:\n";
        for(var x = keys.length-1; x >= 0; x--) {
            msg += "!"+keys[x]+" - " +descriptions[x] +"\n";
        }
        message.reply(msg);
    }
}