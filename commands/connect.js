const tmi = require("tmi.js");
const fs = require("fs");

module.exports = (ctx) => {
    const name = JSON.parse(fs.readFileSync(`data/${ctx.chat.id}/username.json`));
    const token = JSON.parse(fs.readFileSync(`data/${ctx.chat.id}/oauth.json`));

    const client = new tmi.Client({
        options: { 
            debug: true, 
            messagesLogLevel: "info",
        },
        connection: {
            reconnect: true,
            secure: true,
        },
        identity: {
            username: name.username,
            password: token.oauth,
        },
        channels: [ctx.message.text.split(" ")[1]],
    });

    client.connect();

    client.on("message", (channel, user, message) => {
        ctx.reply(`${user.username}: ${message}`);
    });
}