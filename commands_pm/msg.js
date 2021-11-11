var users = new Map();
module.exports = {
    name: 'msg',
    description: 'Anonymously messages the specific channel',
    execute(message, client, args) {
        const author = message.author;
        const username = author.username;
        if (users.get(username) == 0) return author.send("You're out of messages!").catch(() => { });
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

        author.send("You have " + users.get(username) + " messages left.")
        if (users.get(username) == 2) {
            setTimeout(() => {
                users.set(username, 3)
                author.send("Refreshed! You have 3 messages.")
            }
                , 3600000)
        }
    }
}