
module.exports = {
    name: 'gif',
    description: "sends one of the gifs the bot contains",
    execute(message,args) {
        if(args.length == 0 || args.length > 1) return message.channel.send("Command used incorrectly");
        if(args[0] == "racist"){
            message.channel.send({ files: ["./resources/eddie.gif"] });
        }
    }
}