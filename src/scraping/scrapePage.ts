import fetch from 'node-fetch';

export async function scrapePage(urls: string[], extensions: string[]) {

    const mails: string[] = [''];
  
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        const bodyHTML = await fetch(url)
        .then( async (res) => {
            return await res.text()
        })
        .catch((err) => {
            console.log('could not load: ', url)
        })

        if (typeof(bodyHTML) === 'string') {
            // console.log(await extractEmail(bodyHTML))
            const element = bodyHTML.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)

            if (element) {
                for (let j = 0; j < element.length; j++) {
                    for (let k = 0; k < extensions.length; k++) {
                        if (element[j].includes(extensions[k])) {
                            if (element[j].length > 10) {
                                if (!mails.includes(element[j].toString())){
                                    mails.push(element[j].toString())
                                    console.log(element[j].toString())
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(mails)
    return mails
}
