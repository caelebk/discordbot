const ytdl = require('ytdl-core');
const yts = require('yt-search');
module.exports = {
    name: 'play',
    description: 'plays youtube link given',
    async execute(message,args) {
        if(!message.member.voice.channel) return message.reply("please join a channel first.");
        if(args.length == 0) return message.reply("please input a search query.");

        const r = await yts(args.join(" "));
        const videos = r.videos.slice( 0, 3 )
        var details = "\n";
        var num = 1;
        videos.forEach( function ( v ) {
            details += "**[" + num + "] **" + " ("+v.timestamp+") | **" + v.title + "** | " + v.author.name +" | " +  String(v.views) +" views\n";
            num++;
        } )
        if(details == "") return message.channel.send("Video cannot be found.");
        details += "Choices (1, 2, 3, cancel):";
        message.reply(details);
        const response = message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000, errors: ['time']}).then(collected => {
                if (collected.first().content === "1") {
                    num = 1;
                    message.reply("You chose option " + num + ": ** " + videos[0].title + " ** by " + videos[0].author.name);
                } else if (collected.first().content === "2") {
                    num = 2;
                    message.reply("You chose option " + num + ": ** " + videos[1].title + " ** by " + videos[1].author.name);
                } else if (collected.first().content === "3" ) {
                    num = 3;
                    message.reply("You chose option " + num + ": ** " + videos[2].title + " ** by " + videos[2].author.name);
                } else if (collected.first().content === "cancel") {
                    return message.reply("**Canceling operations.**");
                } else {
                    return message.reply("**Invalid Option.**");
                }
            }).catch(() => {
                return message.reply("No response after 30 seconds, shutting down.");
            });
        
        const connect = await message.member.voice.channel.join();
    }
}