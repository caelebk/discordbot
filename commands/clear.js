module.exports = {
    name: "clear",
    description: "Clears all commands and bot messages.",
    execute(message) {
        message.channel.messages.fetch()
        .then(messages => message.channel.bulkDelete(messages.filter(m => m.author.bot || m.content.charAt(0) === "."), true))
        .catch(err =>
            {
                message.channel.send("Not enough permission to clear.")
                console.log(err);
            });
    }
}