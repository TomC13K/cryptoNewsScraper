const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const dates = require('./dateFunctions');
const click = require('./waitRandomizer');
const mongoDB = require('./dbFunctions');

require('dotenv').config()


async function getDataFromURL_CDSK(page) {
    const domainURL = process.env.URL_CDSK
    await page.goto(domainURL);

    const html = await page.content();
    const $ = cheerio.load(html);

    const results = $("section.article-card-fh").map((index, element) => {
        const newsArticlesPath = $(element).find("div.text-group>div.card-text-block>h2.heading>a:nth-child(1)");
        const title = $(newsArticlesPath).text();
        const url = domainURL + $(newsArticlesPath).attr("href");
        const newsDatePath = $(element).find("div.text-group>div.card-text-block>div.card-desc>span.card-date");
        const date = $(newsDatePath).text();
        const isTodayDate = dates.isToday(date);
        const isYesterdayDate = dates.isYesterday(date);

        console.log("\x1b[32m%s\x1b[0m", "Adding data from the page to object...");
        return {
            newsTitle: title,
            newsUrl: url,
            newsDate: date,
            isTodayDate: isTodayDate,
            isYesterdayDate: isYesterdayDate
        };
    }).get();                                                                           // .get is specific to cheerio
    return results;
}

async function getArticlesFrom_CDSK(data, page) {
    for (let i = 0; i < data.length; i++) {
        const article = await getSingleArticle(data[i].newsUrl, page);
        console.log("Adding text from the article ...");
        data[i].newsText = article;
        await mongoDB.addDataToDB(data[i]);
        await click.sleep();
    }
    //console.log(data);
}

async function getSingleArticle(url, page) {
    await page.goto(url);
    const html = await page.content();
    const $ = cheerio.load(html);

    const resultArticle = $("div.article-pharagraph").map((index, element) => {
        const articleParagraphs = $(element).find("p.text");
        const articleText = $(articleParagraphs).text();
        return articleText;
    }).get();

    //resultArticle.pop();                      //remove the last string element from array - some footer from articles
    return resultArticle.join();
}

async function main() {
    await mongoDB.connectToMongoAtlasDB();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const data = await getDataFromURL_CDSK(page);
    
    try {
        await getArticlesFrom_CDSK(data, page);
    } catch (err) {
        console.error("\x1b[33m%s\x1b[0m", "Couldn't get articles from the website because of an error: \n" + err);
    } finally {
        console.log("\x1b[32m%s\x1b[0m", "All Collection Data successfully added to remote DB !");
    }
}

main();
