module.exports = {
    name: "clear",
    description: "Clears all of the bots messages",
    execute(message) {
        message.channel.messages.fetch().then(
            messages => message.channel.bulkDelete(messages.filter(m => m.author.bot)))
            .catch(console.error);
    }
}