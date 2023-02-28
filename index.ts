import { doneSites, readExtensions, readSites, writeToDone, writeToMailList } from "./src/lists/readingWriting";
import { scrape } from "./src/scraping/scraping";
import { scrapePage } from "./src/scraping/scrapePage";
import { scrapeGoogle } from "./src/scraping/scrapeGoogle";

main();

async function main() {

    await scrapeGoogle();

    const sitesToCheck: string[]  = await readSites()
    const extensions: string[]    = await readExtensions();

    const mails: string[] = []
    const sites: string[] = [];


    for (let i = 0; i < sitesToCheck.length; i++) {
        const done: string[]          = await doneSites();
        const item = sitesToCheck[i]

        if (!done.includes(item)) {
           const urls = await scrape(item)

            if (urls !== undefined) {
                const mailsLinks: string[] = await scrapePage(urls, extensions)
                await writeToMailList(mailsLinks);
            }

            await writeToDone(item);
        }

    }
    console.log('done')


}


