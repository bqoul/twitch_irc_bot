const fs = require("fs");

const get = (id) => {
    fs.mkdirSync("data", {recursive: true});
    try {
        return JSON.parse(fs.readFileSync(`data/${id}.json`));
    } catch {
        return {};
    }
}

module.exports = {
    username: (ctx) => {
        const data = get(ctx.chat.id);
        fs.writeFileSync(`data/${ctx.chat.id}.json`, JSON.stringify({
            username: ctx.message.text.split(" ")[1],
            oauth: data.oauth,
            channel: data.channel,
        }, null, 4));
        ctx.reply(`Username has been set to ${ctx.message.text.split(" ")[1]}`);
    },

    oauth: (ctx) => {
        const data = get(ctx.chat.id);
        fs.writeFileSync(`data/${ctx.chat.id}.json`, JSON.stringify({
            username: data.username,
            oauth: ctx.message.text.split(" ")[1],
            channel: data.channel,
        }, null, 4));
        ctx.reply("Oauth token has been set");
    },

    channel: (ctx) => {
        const data = get(ctx.chat.id);
        fs.writeFileSync(`data/${ctx.chat.id}.json`, JSON.stringify({
            username: data.username,
            oauth: data.oauth,
            channel: ctx.message.text.split(" ")[1],
        }, null, 4));
        ctx.reply(`Channel has been set to ${ctx.message.text.split(" ")[1]}`);
    },

    get: (id) => {
        return get(id);
    },
}