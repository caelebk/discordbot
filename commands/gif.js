const fs = require('fs');
const path = require('path');
module.exports = {
    name: 'gif',
    description: "Sends a specific gifs the bot contains.",
    execute(message,args) {
        
        if(args.length == 0) return message.channel.send("Command used incorrectly");
        if(args.length > 1) return message.channel.send("File does not exist.");
        if(args[0] == 'list') return message.channel.send("GIF List:```\n" + createList() + "```"); 

        var filepath = "./resources/gif/" + args[0].toLowerCase() + ".gif";
        message.channel.send({files: [filepath]}).catch(err => {
            console.error(err);
            message.channel.send("File not Found.")
        });
    }
}

function createList(){
    var list = "";
    var files = fs.readdirSync('./resources/gif');
    for(var x = 0; x < files.length; x++){
        list += files[x].substring(0,files[x].indexOf("."))+", ";
    }
    return list;
}