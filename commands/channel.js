const fs = require("fs");

module.exports = ctx => {
    fs.mkdirSync("data", {recursive: true});

    try {
        var data = JSON.parse(fs.readFileSync(`data/${ctx.chat.id}.json`));
    } catch {
        var data = {};
    }

    fs.writeFileSync(`data/${ctx.chat.id}.json`, JSON.stringify({
        username: data?.username,
        oauth: data?.oauth,
        channel: ctx.message.text.split(" ")[1],
    }, null, 4));

    ctx.reply(`Channel has been set to twitch.tv/${ctx.message.text.split(" ")[1]}`);
}