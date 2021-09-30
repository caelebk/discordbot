var users = new Map();
module.exports = {
    name: 'message',
    execute(message, client) {
        const author = message.author;
        const username = author.username;
        if (message.guild != null) return;
        if (message.author.bot) return;
        if (users.get(username) == 0) return message.author.send("You're out of messages!").catch(() => { });



        const args = message.content.split(" ");
        let anonMsg = "";
        args.forEach((value) => {
            anonMsg += value + " ";
        })

        if (!users.has(username)) {
            users.set(username, 2);
        } else {
            users.set(username, users.get(username) - 1);
        }

        setTimeout(() => {
            client.channels.cache.get('379968070829211649').send(anonMsg);
        }, 2000)

        message.author.send("You have " + users.get(username) + " messages left.")
        if (users.get(username) == 2) {
            setTimeout(() => {
                users.set(username, 3)
                message.author.send("Refreshed! You have 3 messages.")
            }
                , 3600000)
        }
    }
}
