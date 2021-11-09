const fs = require('fs')
const Discord = require('discord.js');

//19 participants, reverse on split.
module.exports = {
    name: "ranking",
    description: "The Official NNN Pickems Leaderboard",
    execute(message, args) {
        if (args.length > 1) return;
        const results = readFile('./resources/tierlist/results.json');
        const users = readFile('./resources/tierlist/2021tierlist.json');
        const scores = new Map(Object.entries(results.scores));

        for (const [key, value] of Object.entries(users)) {
            scores.set(key, calculateScore(value[1], results.winningList, false, message));
        }

        results.scores = Object.fromEntries(scores);
        writeFile(results);

        const sortedScores = new Map([...scores.entries()].sort((a, b) => b[1] - a[1]));
        const ranking = [...sortedScores.keys()].reverse();


        if (args.length == 1) {
            if (scores.get(args[0].toLowerCase()) != undefined) {
                message.channel.send("**" + args[0].charAt(0).toUpperCase() + args[0].slice(1) +
                    ":** #" + (ranking.indexOf(args[0].toLowerCase()) + 1)
                    + ", Score: " + scores.get(args[0].toLowerCase()));
                message.channel.send("**Score Breakdown:**");
                calculateScore(users[args[0].toLowerCase()][1], results.winningList, true, message);
            }
        } else {
            ranking.forEach((val, index) => {
                const score = scores.get(val);
                ranking[index] = "**" + (index + 1) + ".** " + val.charAt(0).toUpperCase() + val.slice(1) + " --> Score: " + score;
            })
            const rankingStr = ranking.join('\n');
            createEmbed(message, rankingStr);
        }
    }
}

function createEmbed(message, str) {
    let embed = new Discord.MessageEmbed();
    embed.setTitle("OFFICAL NNN 2021 PICKEMS LEADERBOARDS:");
    embed.setColor('#0099ff');
    embed.setThumbnail('https://www.pinclipart.com/picdir/middle/54-540742_leaderboard-icon-free-download-leaderboard-icons-png-clipart.png');
    embed.setAuthor('Made by Caeleb', 'https://cdn.discordapp.com/avatars/216602183683014656/1eedd6b15d3eb222c949752c96da6a1a.webp', 'https://www.caelebkoharjo.herokuapp.com');
    embed.setDescription('Scores are calculated using the following formula.\n   ->*Summation of (actual placement - predicted placement)*\nIn other words, lower score = more accurate pickems');
    embed.addFields({ name: "Leaderboards:", value: str });
    message.channel.send(embed);
}
/*
Takes in a string for the list of the specified user.
*/
function calculateScore(str, winningList, print, message) {
    const temp = str.toLowerCase().split('\n').reverse();
    let score = 0;
    let s = ""
    for (const x of winningList) {
        if (temp.indexOf(x) != -1) {
            score += Math.abs(winningList.indexOf(x) - temp.indexOf(x));
            if (print)
                s += "**Total Points:** " + score + " due to missed placement of **" + x + "** by " + Math.abs(winningList.indexOf(x) - temp.indexOf(x)) + " spots\n";
        }
    }
    if (print)
        message.channel.send(s);
    return score;
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