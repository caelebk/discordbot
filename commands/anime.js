var fs = require('fs');
module.exports = {
    name: 'anime',
    description: 'Discord anime list, used with .anime [current/plan] [add/remove] [title] to add/remove to either currently watching/plan to watch or .anime list to check the list.',
    execute(message, args) {
        if(args.length < 1) return message.channel.send("Command incorrectly used");
        if(args[0] == "list") return message.channel.send(readFile());

        var animename = "";
        for(var x = 2; x < args.length; x++)
            animename += args[x] + " ";
            
        if(animename == "") return message.channel.send("No anime inputted.");
        if (args[0] == "plan") {
            message.channel.send(writeFile(args[0], args[1], animename.trim()));
        } else if (args[0] == "current") {
            message.channel.send(writeFile(args[0], args[1], animename.trim()));
        } else {
            return message.channel.send("Command incorrectly used.")
        }
    }
}

function readFile(){
    try{
        console.log(fs.readFileSync('./resources/animelist/animelist.txt', 'utf8'))
        return fs.readFileSync('./resources/animelist/animelist.txt', 'utf8')
    } catch (err) {
        console.error(err);
    }
    return "error";
}

//fix arguments
 function writeFile(list, ins, str){
    var content = readFile().split('\n');
    console.log(content);
    if(list == "current")
        var edit = 1;
    else if(list == "plan")
        var edit = 3;
    else return "failed";

    if(ins == "add"){
        content[edit] += str + ", ";
    } else if (ins == "remove") {
        content[edit] = removeText(content[edit], str);
    }
    fs.writeFile('./resources/animelist/animelist.txt', content.join("\n"), function (err) {
        if (err) throw err;
    });
    return content.join("\n");
}
    

function removeText(str, strRemove){
    console.log(str);
    return str.replace(strRemove + ", ", "");
}