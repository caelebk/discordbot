
module.exports = {
    name: 'racist',
    description: "",
    execute(message) {
        message.channel.send({ files: ["./resources/eddie.gif"] });
    }
}