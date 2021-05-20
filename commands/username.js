const fs = require("fs");

module.exports = ctx => {
    fs.mkdirSync("data", {recursive: true});

    try {
        var data = JSON.parse(fs.readFileSync(`data/${ctx.chat.id}.json`));
    } catch {
        var data = {};
    }

    fs.writeFileSync(`data/${ctx.chat.id}.json`, JSON.stringify({
        username: ctx.message.text.split(" ")[1],
        oauth: data?.oauth,
        channel: data?.channel,
    }, null, 4));

    ctx.reply("Twitch username has been set");
}