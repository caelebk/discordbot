var fs = require('fs');
module.exports = {
    name: 'anime',
    description: 'Use .anime [current/plan] [add/remove] [title] or .anime [list] to add/remove/check the list.',
    execute(message, args) {
        if (args.length < 1) return message.channel.send("Command incorrectly used");
        let list = readFile();
        if (args[0] == "list") return message.channel.send(printList(list));
        // .anime current add "anime"
        var animename = "";
        for (var x = 2; x < args.length; x++)
            animename += args[x] + " ";
        if (animename == "") return message.channel.send("No anime inputted.");
        if (args[0] == "current")
            updateList(args[1], animename.trim(), list.currentlyWatching);
        else if (args[0] == "plan")
            updateList(args[1], animename.trim(), list.planToWatch);
        writeFile(list);
        console.log(list);
    }
}

function updateList(arg, anime, list) {
    if (arg == "add")
        list.push(anime)
    else if (arg == "remove") {
        let index = list.indexOf(anime);
        if (index == -1) return;
        list.splice(index, 1)
    }
}

function printList(file) {
    let animelist = '**Currently Watching:**\n';

    for (let x of file.currentlyWatching) {
        animelist += x + ", ";
    }
    animelist += "\n**Planning to Watch:**\n";
    for (let x of file.planToWatch) {
        animelist += x + ", ";
    }
    return animelist;
}

function readFile() {
    try {
        let json = fs.readFileSync('./resources/animelist/animelist.json')
        return JSON.parse(json);
    } catch (err) {
        console.error(err);
    }
    return "error";
}

function writeFile(jsonfile) {
    try {
        let list = JSON.stringify(jsonfile);
        fs.writeFileSync('./resources/animelist/animelist.json', list)
    } catch (err) {
        console.error(err);
    }
}