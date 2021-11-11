const fs = require('fs');
module.exports = {
    name: 'loser',
    execute(message, client, args) {
        const results = readFile('./resources/tierlist/results.json');
        if (args.length == 0) return message.channel.send(results.winningList);
        if (args.length != 2) return;
        const lose = args[1].toLowerCase();

        if (Object.keys(results.scores).indexOf(lose) == -1)
            return;


        if (args[0] == "add" && results.winningList.indexOf(lose) == -1) {
            results.winningList.push(lose);
            message.channel.send(results.winningList);
            setTimeout(() => {
                client.channels.cache.get('772958938538049556').send("@here WE HAVE A NEW LOSER. " + lose.toUpperCase() + " HAS CONFESSED TO HIS SINS.");
            }, 2000)
        } else if (args[0] == "remove" && results.winningList.indexOf(lose) != -1) {
            results.winningList.splice(results.winningList.indexOf(lose), 1);
            message.channel.send(results.winningList);
        }

        writeFile(results);
    }
}

function readFile(path) {
    try {
        let json = fs.readFileSync(path);
        const data = JSON.parse(json);
        return data;
    } catch (err) {
        console.error(err);
    }
    return "error";
}

async function writeFile(results) {
    try {
        let list = JSON.stringify(results);
        fs.writeFileSync('./resources/tierlist/results.json', list)
    } catch (err) {
        console.error(err);
    }
}