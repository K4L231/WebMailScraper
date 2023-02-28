import fetch from 'node-fetch';
export async function siteMapScrape(url: string, hostname: string) {
    const extractUrls = require("extract-urls");
    const bodyHTML = await fetch(url)
    .then( async (res) => {
        return await res.text()
    })
    .catch((err) => {
        console.log('')
    })

    // await browser.close();
    return extractUrls(bodyHTML)
}