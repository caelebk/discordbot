module.exports = {
    name: "stop",
    description: "stops the musicbot",
    async execute(message,args){
        if(!message.member.voice.channel) return message.reply("currently not in a voice channel.");
        await message.member.voice.channel.leave();
    }

}