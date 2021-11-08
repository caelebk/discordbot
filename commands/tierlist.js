const Discord = require('discord.js');
const fs = require('fs');
const usersList = new Map();
const oct = new Date('October 24, 2021 03:24:00');
const nov = new Date('November 1, 2021 03:24:00');
//dates are from 24 October 2021 to 1 November 2021
module.exports = {
    name: "tierlist",
    description: "Prints selected tierlist.",
    async execute(message, client, args) {
        const pinned = await client.channels.cache.get('772958938538049556').messages.fetchPinned();
        for(let x of pinned) {
            if(x[1].createdAt < nov &&  x[1].createdAt > oct){
                let temp = translateStr(x[1].content);
                usersList.set(x[1].author.username, [x[1].author,temp]);
            }
        }
        console.log(usersList)
        /*
        const obj = Object.fromEntries(usersList);
        writeFile(obj);*/
        //createEmbed(message, usersList.get('chicken789')[0], usersList.get('chicken789')[1]);
    }
}

function createEmbed(message, author, content){
    let embed = new Discord.MessageEmbed();
    embed.setTitle(author.username +"'s offical NNN Tier List 2021");
    embed.setColor('#0099ff');
    embed.setThumbnail(author.avatarURL());
    embed.addFields({name: "Tier List:", value: content});
    message.channel.send(embed);
}

//keywords: pick, list, pref .splice(0,1)
function translateStr(list){
    //console.log('Before:\n', list)
    list = list.split('\n');
    let count = 0;
    for(let x = 0; x < 2; x++) {
        let line = list[x].toLowerCase();
        if (line === '' || (line.indexOf('pick') != -1 || line.indexOf('list') != -1 || line.indexOf('pref') != -1)) {
            count++;
        }
    }
    list.splice(0,count);
    console.log(list.length);
    return list.join('\n');
}

function readFile() {
    try {
        let json = fs.readFileSync('./resources/tierlist/2021tierlist.json')
        return JSON.parse(json);
    } catch (err) {
        console.error(err);
    }
    return "error";
}

function writeFile(jsonfile) {
    try {
        let list = JSON.stringify(jsonfile);
        fs.writeFileSync('./resources/tierlist/2021tierlist.json', list)
    } catch (err) {
        console.error(err);
    }
}