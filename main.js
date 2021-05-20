const bot = require("./bot");

bot.start((ctx) => {
    ctx.reply(`Hello, ${ctx.chat.username}!\n
With my help you can read and type in chat on twitch by chatting in telegram.\n
How? Why? Those are questions i cant help you with, BUT!\n
\nConfiguration guide:\n
1. Use /username command to set your existing twitch username;
2. Use /oauth command to set your twitch oauth token (you can use https://twitchapps.com/tmi/ to generate one);
3. Use /connect command to connect this bot to the channel you want to chat in;
\nAll Done, enjoy!\n
\nP.S. My creator asked to tell you this: "btw by doing those steps you basically giving me your twitch account, please cosider creating new twitch account just for this bot"`);
});

bot.on("message", ctx => {
    switch(ctx.message.text.split(" ")[0]) {
        case "/username":
            const username = require("./commands/username");
            username(ctx);
            break;

        case "/oauth":
            const oauth = require("./commands/oauth");
            oauth(ctx);
            break;

        case "/connect":
            const connect = require("./commands/connect");
            connect(ctx);
            break;
    }
});

bot.launch();