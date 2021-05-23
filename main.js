const bot = require("./bot");
const data = require("./alias/data");

let twitch = bot.twitch("default");
let info = data.get("default")
let connected = false;

bot.telegram.start((ctx) => {
    ctx.reply(`Hello, ${ctx.chat.username}!\n
With my help you can read and type in chat on twitch by chatting in telegram.\n
How? Why? Those are questions i cant help you with.\n
Quick guide:
1. Use /username command to set your existing twitch username;
2. Use /oauth command to set your twitch oauth token (you can use https://twitchapps.com/tmi/ to generate one);
3. Use /channel to set the twitch channel of your choice;
4. Use /connect to connect to the chosen channel;
5. Use /disconnect to disconnect from the channel;
\nAll Done, enjoy!\n
\nP.S. My creator asked to tell you this: "btw by doing first and second steps you basically giving me your twitch account, please cosider creating new twitch account just for this bot.telegram"`);
});

bot.telegram.on("message", async ctx => {
    switch(ctx.message.text.split(" ")[0]) {
        case "/username":
            data.username(ctx);
            break;

        case "/oauth":
            data.oauth(ctx);
            break;

        case "/channel":
            data.channel(ctx);
            break;

        case "/connect":
            twitch = bot.twitch(ctx.chat.id);
            await twitch.connect();
            connected = true;

            info = data.get(ctx.chat.id);
            ctx.reply(`connected to twitch.tv/${info.channel} have fun chatting!`);
            twitch.on("message", (channel, user, message, self) => {
                if(self || !connected) {
                    return
                }

                ctx.reply(`${user.username}: ${message}`);
            });
            break;

        case "/disconnect":
            connected = false;
            twitch = bot.twitch("default");
            ctx.reply(`disconnected from twitch.tv/${info.channel}`);
            break;

        default:
            info = data.get(ctx.chat.id);
            twitch.say(info.channel, ctx.message.text);
            break;
    }
});

bot.telegram.launch();