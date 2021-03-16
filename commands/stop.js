module.exports = {
    name: "stop",
    description: "stops the musicbot",
    async exectue(message,args){
        if(!message.member.voice.channel) return message.reply("Currently not in a voice channel.");
        await message.member.voice.channel.leave();
    }

}