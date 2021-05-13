const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: "Lists all the bot commands.",
    execute(message,client) {
        var keys = Array.from(client.commands.keys());
        var descriptions = Array.from(client.commandDescriptions.keys());
        var msg = "";
        var help = keys.indexOf("help");
        msg += "**." + keys[help] +"** - "+ descriptions[help]+"\n";
        for(var x = 0; x < keys.length; x++) {
            if(x!=help)
                msg += "**."+keys[x]+"** - " +descriptions[x] +"\n";
        }
        console.log(msg);
        var embed = new Discord.MessageEmbed();
        embed.setTitle("Monkey OOGA BOOGA Bot");
        embed.setColor('#0099ff');
        embed.setThumbnail('https://cdn.discordapp.com/avatars/580563737635848192/5a16616a8eb9bc5115bef04c6e2c8eb5.png?size=256');
        embed.setDescription("Multi-Function Bot made for Squad Discord Server");
        embed.setAuthor('Made by Caeleb', 'https://cdn.discordapp.com/avatars/216602183683014656/1eedd6b15d3eb222c949752c96da6a1a.png?size=256', 'https://caelebk.github.io/personal-site/');
        embed.addFields({name: "Commands", value: msg});
        message.channel.send(embed);
    }
}