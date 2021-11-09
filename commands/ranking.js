const fs = require('fs')
const results = readFile('./resources/tierlist/results.json');
const winningList = results.winningList;
const users = readFile('./resources/tierlist/2021tierlist.json');

//19 participants, reverse on split.
module.exports = {
    name: "ranking",
    description: "The Official NNN Pickems Leaderboard",
    execute(message, args) {
        const scores = new Map(Object.entries(results.scores));
        for (const [key, value] of Object.entries(users)) {
            scores.set(key, calculateScore(value[1]));
        }
        results.scores = Object.fromEntries(scores);
        writeFile();

    }
}

/*
Takes in a string for the list of the specified user.
*/
function calculateScore(str) {
    const temp = str.toLowerCase().split('\n').reverse();
    //console.log("temp = ", temp);
    //console.log("winninglist = ", winningList);
    let score = 0;
    for (const x of winningList) {
        if (temp.indexOf(x) != -1) {
            score += Math.abs(winningList.indexOf(x) - temp.indexOf(x));
            //console.log("Score:", score, "because of a diff of", Math.abs(winningList.indexOf(x) - temp.indexOf(x)), "for", x)
        }
    }
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


async function writeFile() {
    try {
        let list = JSON.stringify(results);
        fs.writeFileSync('./resources/tierlist/results.json', list)
    } catch (err) {
        console.error(err);
    }
}