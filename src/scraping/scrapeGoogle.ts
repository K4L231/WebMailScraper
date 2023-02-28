import { readQueryList, writeToSites } from "../lists/readingWriting";

const  googleIt = require('google-it')

export async function scrapeGoogle() {

    const googleQueries = await readQueryList();

    for (let i = 0; i < googleQueries.length; i++) {
        const item = googleQueries[i];
        await googleIt({'query': item}).then( async (results: any) => {
            console.log('Scraped google')
            const siteArr = []
            for (let j = 0; j < results.length; j++) {
                siteArr.push(results[j].link)
            }
            await writeToSites(siteArr)
          }).catch((e: any) => {
            console.log(e);
          })
    }
}