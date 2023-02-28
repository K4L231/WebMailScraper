import sites from './siteList.json'
import done from './doneList.json'
import extensions from './extensions.json'
import mailList from './mailList.json'
import query from './googleQuery.json'

var writeJson = require('write-json'); 

export async function readSites() {
    return sites.items
}

export async function doneSites() {
    return done.done
}

export async function readExtensions() {
    return extensions.extensions
}

export async function readMailList() {
    return mailList.mailList
}

export async function readQueryList() {
    return query.query;
}


export async function writeToDone(item: string) {
    const data: string[] = await doneSites()
    if (!data.includes(item)) {
        data.push(item)

        var pkg = {done: data};
    
        writeJson('./src/lists/doneList.json', pkg, function(err: any) {
            if (err) console.log(err);
          });
    }
}

export async function writeToMailList(mailsArr: string[]) {
    const data: string[] = await readMailList();
    for( let i = 0; i < mailsArr.length; i++) {
        const item = mailsArr[i]
        if (!data.includes(item)) {
            data.push(item);
        }
    }
    var pkg = {mailList: data}
    
    writeJson('./src/lists/mailList.json', pkg, function(err: any) {
        if (err) console.log(err);
      });
}

export async function writeToSites(array: string[]) {
    const data = await readSites();

    for( let i = 0; i < array.length; i++) {
        const item = array[i]
        let { hostname } = new URL(item);
        const url = 'https://' + hostname

        if (!data.includes(url) && !url.includes('google')) {
            data.push(url);
        }
    }

    var pkg = {items: data}
    
    writeJson('./src/lists/siteList.json', pkg, function(err: any) {
        if (err) console.log(err);
      });

}





























