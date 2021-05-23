const bot = require("./bot");
const data = require("./commands/data");

bot.start((ctx) => {
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
\nP.S. My creator asked to tell you this: "btw by doing first and second steps you basically giving me your twitch account, please cosider creating new twitch account just for this bot"`);
});

bot.on("message", ctx => {
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
            break;

        case "/disconnect":
            break;

        default:
            break;
    }
});

bot.launch();