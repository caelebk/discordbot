const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./../secret.json');
module.exports = {
    name: "stat",
    description: "gets stats",
    async execute(message, args) {
        if(args[0] == "") return;
        const text = await getData(args[0], args[1], message)
        message.reply(text);
    }
}


async function getData(name, query, message){
    const doc = new GoogleSpreadsheet('1DLdMz5I5bSKrKNi6qTZ28A_QNS3bUxzSE-cmaELVRAk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    var output = "";
    for(var x = 0; x < rows.length; x++) {
        var temp = rows[x]['Name/Role'];
        if(name == temp.substring(0,temp.indexOf('/'))) {
            console.log(temp);
            output += temp;
            break;
        }
    }
    output += " " + query + ": " + rows[x][query];
    console.log(rows[x][query]);
    console.log(output);
    return output;
}

