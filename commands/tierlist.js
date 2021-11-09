const Discord = require('discord.js');
const fs = require('fs');
let usersList = new Map();
const oct = new Date('October 24, 2021 03:24:00');
const nov = new Date('November 1, 2021 03:24:00');
//dates are from 24 October 2021 to 1 November 2021
module.exports = {
    name: "tierlist",
    description: "Prints selected tierlist.",
    execute(message, client, args) {
        //writeFile(client);
        if (args.length != 1) return;
        readFile();

        const name = args[0].toLowerCase();
        if (usersList.get(name) == undefined) return;

        createEmbed(message, name, usersList.get(name)[0], usersList.get(name)[1])

        /*for(const [key, value] of usersList.entries()) {
            createEmbed(message, key, value[0], value[1]);
        }*/

        //createEmbed(message, usersList.get('chicken789')[0], usersList.get('chicken789')[1]);
    }
}

function createEmbed(message, name, author, content) {
    let embed = new Discord.MessageEmbed();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    embed.setTitle(name + "'s offical NNN Tier List 2021");
    embed.setColor('#0099ff');
    embed.setThumbnail(author.avatarURL);
    embed.addFields({ name: "Tier List:", value: content });
    message.channel.send(embed);
}

//keywords: pick, list, pref .splice(0,1)
function translateStr(list) {
    //console.log('Before:\n', list)
    list = list.split('\n');
    let count = 0;
    for (let x = 0; x < 2; x++) {
        let line = list[x].toLowerCase();
        if (line === '' || (line.indexOf('pick') != -1 || line.indexOf('list') != -1 || line.indexOf('pref') != -1)) {
            count++;
        }
    }
    list.splice(0, count);
    console.log(list.length);
    return list.join('\n');
}

function readFile() {
    try {
        let json = fs.readFileSync('./resources/tierlist/2021tierlist.json')
        const data = JSON.parse(json);
        usersList = new Map(Object.entries(data));
    } catch (err) {
        console.error(err);
    }
    return "error";
}

async function writeFile(client) {
    try {
        const pinned = await client.channels.cache.get('772958938538049556').messages.fetchPinned();
        for (let x of pinned) {
            if (x[1].createdAt < nov && x[1].createdAt > oct) {
                let temp = translateStr(x[1].content);
                usersList.set(x[1].author.username.toLowerCase(), [x[1].author, temp]);
            }
        }
        const obj = Object.fromEntries(usersList);
        let list = JSON.stringify(obj);
        fs.writeFileSync('./resources/tierlist/2021tierlist.json', list)
    } catch (err) {
        console.error(err);
    }
}