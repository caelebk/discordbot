const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [wr] = await page.$x('//*[@id="SummonerLayoutContent"]/div[2]/div[1]/div[1]/div/div[2]/div[3]/span[2]/span[3]');
    const txt = await wr.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    const [rank] = await page.$x('/html/body/div[2]/div[2]/div/div/div[5]/div[2]/div[1]/div[1]/div/div[2]/div[2]');
    const txt2 = await rank.getProperty('textContent');
    const rawTxt2 = await txt2.jsonValue();

    console.log({rawTxt, rawTxt2});
}
scrapeProduct("")
