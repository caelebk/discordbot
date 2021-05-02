
module.exports = {
    name: 'args',
    description: "Lists all arguments after the command.",
    execute(message,args) {
        var argStr = ""
        for (var x = 0; x < args.length; x++){
            argStr += args[x] + " ";
        }
        message.channel.send(argStr);
    }
}