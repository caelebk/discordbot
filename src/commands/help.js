module.exports = {
    name: 'help',
    description: " Lists all the bot commands",
    execute(message,args,client) {
        var keys = Array.from(client.commands.keys());
        message.reply("Current Commands:\n !" + keys[1] + " - List of commands \n !"+ keys[0] + " -  prints what comes after the command");
    }
}