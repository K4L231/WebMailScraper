import { siteMapScrape } from "./siteMap";
import { doneSites } from "../lists/readingWriting";

export async function scrape(rawurl: string) {

    let { hostname } = new URL(rawurl);
    const sitemapUrl = 'https://' + hostname + '/sitemap.xml'
    hostname = hostname.slice(4)
    const pages: string[] = await siteMapScrape(sitemapUrl, hostname)
    const pagesToScrape: string[] = [];

    if (pages === undefined) return pagesToScrape

    for (let i = 0; i < pages.length; i++) {

        if (pages.length > 5000) break;

        const item: string = pages[i]
        const itemDomain = new URL(rawurl).hostname;

        if (item.includes(hostname) && item.includes('sitemap') && !item.includes('wp-')) {
            const morePages = await siteMapScrape(item, hostname)
            if (morePages !== undefined && morePages.length !== undefined) {
                for (let j = 0; j < morePages.length; j++) {
                    if (morePages[j].includes(hostname) && !morePages[j].includes('wp-')) {
                        if (!pages.includes(morePages[j])) {
                            if (!pages.includes(morePages[j]) && item.indexOf('wp-') === -1) {
                                pages.push(morePages[j])
                            }
                        }
                    }
                }
            }
        }

        if (item.includes(hostname) && !item.includes('sitemap')) {
            console.log("Page to scrape: ", item)
            pagesToScrape.push(item)
        }

        console.log('pages to scrape: ', pages.length, 'i: ', i, 'left: ', pages.length - i)
        
    }
    console.log(pagesToScrape.length)
    return pagesToScrape;
}