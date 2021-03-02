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
        if (name === "laneless") return message.channel.send("**Laneless**: remains free as fuck");
        var info = scrapeProduct(baseUrl+name, message, name);
        
    }
}
async function scrapeProduct(url, message, name) {
    console.log("scraping "+ url);
    const browser = await puppeteer.launch();
    console.log("1");
    const page = await browser.newPage();
    console.log("2");
    await page.goto(url);
    console.log("3");

    ////*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[2]/span[3]
    const [wr] = await page.$x('//*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[2]/span[3]');
    if(typeof(wr) == 'undefined') {
        console.log("Failed to find winrate");
        return message.channel.send("Failed to find winrate due to either being unranked or being fucking bad.");
    }
    console.log("4");
    const txt = await wr.getProperty('textContent');
    console.log("5");
    const winrate = await txt.jsonValue();
    console.log("6");


    ////*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[2]
    const [r] = await page.$x('/html/body/div[2]/div[2]/div/div/div[5]/div[2]/div[1]/div[1]/div/div[2]/div[2]');
    if(typeof(r) == 'undefined') {
        console.log("Failed to find rank")
        return message.channel.send("Failed to find rank due to either being unranked or being fucking bad.");
    }
    console.log("7");
    const txt2 = await r.getProperty('textContent');
    console.log("8");
    const rank = await txt2.jsonValue();
    console.log("9");
    
    var info = {winrate, rank};
    var split = name.split("+");
    for(var x = 0; x < split.length; x++)
        split[x] = split[x].substring(0,1).toUpperCase() + split[x].substring(1);
    console.log(split.join(" ") +": " + info.winrate + ", "+ info.rank);
    message.channel.send("**" + split.join(" ") +":** " + info.winrate + ", "+ info.rank + "  @ " + url);
    message.channel.send("stay free noob");
}

