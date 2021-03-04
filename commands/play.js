const ytdl = require('ytdl-core');
const yts = require('yt-search');
module.exports = {
    name: 'play',
    description: 'either search for a youtube video or link a youtube video to play',
    async execute(message,args) {
        if(!message.member.voice.channel) return message.reply("please join a channel first.");
        if(!message.member.voice.channel.permissionsFor(message.client.user).has('CONNECT')) return message.reply("Need permissions to join");
        if(!message.member.voice.channel.permissionsFor(message.client.user).has('SPEAK')) return message.reply("Need permissions to speak");
        if(args.length == 0) return message.reply("please input a search query.");


        const search = async(query) => {
            const r = await yts(query);
            const videos = r.videos.slice( 0, 3 )
            var details = "\n";
            var num = 1;

            if(videos.length == 0) return message.channel.send("Video/Results cannot be found.");
            videos.forEach( function ( v ) {
                details += "**[" + num + "] **" + " ("+v.timestamp+") | **" + v.title + "** | " + v.author.name +" | " +  String(v.views) +" views\n";
                num++;
            } )

            details += "Choices (1, 2, 3, cancel):";
            message.reply(details);
            return videos;
        }


        const connect = await message.member.voice.channel.join();
        const videos = await search(args.join(' '));
        let msg = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000, errors: ['time']}).catch(() => {
            return message.reply("No Response or Invalid Option.");
        });
        let num = msg.first().content;
        console.log("Message recieved:" + num);
        num = recieveInput(message, videos, num);
        if(num === -1) return;
        playSong(connect, videos, num, message);
    }
}

async function playSong(connect, videos, num, message){
    const stream = ytdl(videos[num-1].url, {filter: 'audioonly'});
    connect.play(stream, {seek: 0, volume: 1}).on('finish', () =>{
        message.member.voice.channel.leave();
    });
}

function recieveInput(message, videos, num){
    switch(num) {
        case '1':
            message.reply("You chose option " + num + ": ** " + videos[0].title + " ** by " + videos[0].author.name + "\n" + videos[0].url);
            return num;
        case '2':
            message.reply("You chose option " + num + ": ** " + videos[1].title + " ** by " + videos[1].author.name + "\n" + videos[1].url);
            return num;
        case '3':
            message.reply("You chose option " + num + ": ** " + videos[2].title + " ** by " + videos[2].author.name + "\n" + videos[2].url);
            return num;
        case 'cancel':
            message.reply("**Canceling operations.**");
            return -1;
        default:
            message.reply("**Invalid Option.**");
            return -1;
    }
}
