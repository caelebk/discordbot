const fs = require('fs');
module.exports = {
    name: 'gif',
    description: "sends one of the gifs the bot contains",
    execute(message,args) {
        
        if(args.length == 0 || args.length > 1) return message.channel.send("Command used incorrectly");
        if(args[0] == 'list') {
            message.channel.send("GIF List:```\n" + createList() + "```")
        }else if(args[0] == "racist"){
            message.channel.send({ files: ["./resources/gif/racist.gif"] });
        }else if(args[0] == "shrek"){
            message.channel.send({ files: ["./resources/gif/shrek.gif"] });
        }else if(args[0] == "andrew"){
            message.channel.send({ files: ["./resources/gif/andrew.gif"] });
        }else if(args[0] == "apex"){
            message.channel.send({ files: ["./resources/gif/apex.gif"] });
        }else if(args[0] == "god"){
            message.channel.send({ files: ["./resources/gif/god.gif"] });
        }else if(args[0] == "monke"){
            message.channel.send({ files: ["./resources/gif/monke.gif"] });
        }else if(args[0] == "phasmo"){
            message.channel.send({ files: ["./resources/gif/phasmo.gif"] });
        }
    }
}

function createList(){
    var list = "";
    var files = fs.readdirSync('./resources/gif');
    for(var x = 1; x < files.length; x++){
        list += files[x].substring(0,files[x].indexOf("."))+", ";
    }
    return list;
}