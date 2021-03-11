const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./../secret.json');
module.exports = {
    name: "stat",
    description: "gets stats",
    async execute(message, args) {
        if(args[0] == "" || args.length <= 1) return message.reply("Invalid input.");
        const text = await getData(args[0], args[1])
        message.reply(text);
    }
}


async function getData(name, query){
    const doc = new GoogleSpreadsheet('1DLdMz5I5bSKrKNi6qTZ28A_QNS3bUxzSE-cmaELVRAk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    var output = "";
    for(var x = 0; x < rows.length; x++) {
        var temp = rows[x]['Name/Role'];
        if(name == temp.substring(0,temp.indexOf('/')).toLowerCase()) {
            output += temp;
            break;
        }
    }
    if(query.toLowerCase() == "kda")
        query = query.toUpperCase();
    else
        query = query.charAt(0).toUpperCase() + query.slice(1);
    
    output += " " + query + ": " + rows[x][query];
    console.log(output);
    return output;
}

