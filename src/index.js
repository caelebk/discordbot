const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const message = require("./events/message");
const client = new Discord.Client();
client.login(config.BOT_TOKEN);


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const event = require(`./events/${file}`);
    client.events.set(event.name, event);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
