
const axios = require("axios");
const cheerio = require("cheerio");
const { stat } = require("fs");
module.exports = {
    name: "opgg",
    description: "finds the given players winrate",
    execute(message,args) {
        const baseUrl = "https://na.op.gg/summoner/userName=";
        var user = args.join("+").toLowerCase();
        if (user === "laneless") return message.channel.send("**Laneless**: Brainless");

        scrape(baseUrl+user, message);
    }
}

async function scrape(url, message){
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);;
    var content = $('meta[name="description"]').attr("content");
    var stats = content.split("/");
    for(var x = 0; x < stats.length; x++){
        stats[x] = stats[x].trim();
    }
    //console.log(stats);

    if(stats.length < 1) {
        message.channel.send("User doesn't exist.")
        return;
    }
    var msg = concatenate(stats);
    message.channel.send(msg);
}

function concatenate(strarray){
    if (strarray.length < 4) {
        return "**Name: **" + strarray[0] + "\n**Level: **" + strarray[2] +"\nNo Stats Found.";
    }
    
    var msg = "**Name: **" +strarray[0];

    var rankinfo = strarray[1].split(" ");
    msg += "\n**Rank:** " + rankinfo[0] + " " + rankinfo[1] + " **|** " + rankinfo[2];

    var ratio = strarray[2].split(" ");
    var wr = ratio[2] + " " + "Rate:** " + ratio[4];
    msg += "\n**" + wr + " **|** " + ratio[0] + "-" + ratio[1];

    var champinfo = strarray[3].split(",");
    msg += "\n**Most Played Champions:**";
    msg += "\n**------------------------------**";
    for(var x = 0; x < champinfo.length; x++){
        msg += "\n" + champinfo[x].trim();
    }

    return msg;
}


function findMaxLength(strarray){
    var max = 0;
    for(var x = 0; x < strarray.length; x++){
        if(max < strarray[x].length){
            max = strarray[x].length;
        }
    }
    return max;
}

