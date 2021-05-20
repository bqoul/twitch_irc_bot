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
        oauth: ctx.message.text.split(" ")[1],
        channel: data?.channel,
    }, null, 4));

    ctx.reply("Oauth token has been set");
}