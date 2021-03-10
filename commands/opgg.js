const puppeteer = require('puppeteer');

module.exports = {
    name: "opgg",
    description: "finds the given players winrate",
    execute(message,args) {
        //div class = TierInfo
        //div class = TierRank
        const baseUrl = "https://na.op.gg/summoner/userName=";
        var name = args.join("+").toLowerCase();
        console.log(name);
        if (name === "laneless") return message.channel.send("**Laneless**: Brainless");
        scrape(baseUrl+name, message, name);
        
    }
}
async function scrape(url, message, name) {

    var split = name.split("+");
    for(var x = 0; x < split.length; x++)
        split[x] = split[x].substring(0,1).toUpperCase() + split[x].substring(1);
    console.log("scraping "+ url);
    const browser = await puppeteer.launch();
    console.log("1");
    const page = await browser.newPage();
    console.log("2");
    await page.goto(url);
    console.log("3");


    //"/html/body/div[2]/div[3]/div/div/div[5]/div[2]/div[1]/div[1]/div/div[2]/div[2]"
    const [r] = await page.$x('/html/body/div[2]/div[3]/div/div/div[5]/div[2]/div[1]/div[1]/div/div[2]/div[2]');
    if(typeof(r) == 'undefined') {
        console.log("Failed to find rank")
        return message.channel.send("Failed to find rank | User doesn't exist.");
    }
    console.log("4");
    const txt2 = await r.getProperty('textContent');
    console.log("5");
    const rank = await txt2.jsonValue();
    console.log("6");
    if(rank.trim() == "Unranked") return message.channel.send("**" + split.join(" ") + ":** " + "Unranked @ " + url);

    ////*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[2]/span[3]
    const [wr] = await page.$x('//*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[2]/span[3]');
    if(typeof(wr) == 'undefined') {
        console.log("Failed to find winrate");
        return message.channel.send("Failed to find winrate due to either being unranked or being bad.");
    }
    console.log("7");
    const txt = await wr.getProperty('textContent');
    console.log("8");
    const winrate = await txt.jsonValue();
    console.log("9");
    
    //"//*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[1]"
    const [lpr] = await page.$x('//*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[1]');
    if(typeof(lpr) == 'undefined') {
        console.log("Failed to find LP")
        return message.channel.send("Failed to find LP.");
    }
    console.log("10");
    const txt3 = await lpr.getProperty('textContent');
    console.log("11");
    const lp = await txt3.jsonValue();
    console.log("12");


    console.log(split.join(" ") +": " + winrate + ", "+ rank + ", " + lp.replace(/\D/g, "") + " LP ");
    message.channel.send("**" + split.join(" ") +":** " + winrate + ", "+ rank + ", " + lp.replace(/\D/g, "") + " LP  @ " + url);
    message.channel.send("stay free noob");
}

