module.exports = {
    name: 'message',
    execute(message, client) {
        const prefix = "!";
        if (message.author.bot) return; // if message is from the bot itself or other bots ignore.
        if (!message.content.startsWith(prefix)) return; //if message doesnt start with prefix then ignore.

        const commandLine = message.content.slice(prefix.length); // we want to remove the prefix from the content
        const args = commandLine.split(" "); //Splits the string based on the spaces into an array. (1st will be the command, rest are arguments)
        const command = args.shift().toLowerCase(); //removes the first substring in the array (command) and turns the string to lowercase.

        if(command === "help") {
            client.commands.get('help').execute(message,args,client);
        } else if (command === "args") {
            client.commands.get('args').execute(message,args);
        } else if (command === "play") {
            client.commands.get('play').execute(message,args);
        } else if (command === "stop") {
            client.commands.get('stop').execute(message,args);
        } else if (command === "opgg") {
            client.commands.get('opgg').execute(message,args);
        } else if (command === "stat") {
            client.commands.get('stat').execute(message, args);
        }
    }
}