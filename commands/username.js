const fs = require("fs");

module.exports = ctx => {
    try {
        fs.writeFileSync(`data/${ctx.chat.id}/username.json`, JSON.stringify({
            username: ctx.message.text.split(" ")[1],
        }, null, 1));
    } catch {
        fs.mkdirSync(`data/${ctx.chat.id}`, {recursive: true});
        fs.writeFileSync(`data/${ctx.chat.id}/username.json`, JSON.stringify({
            username: ctx.message.text.split(" ")[1],
        }, null, 1));
    } finally {
        ctx.reply("Twitch username has been set");
    }
}