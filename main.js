const bot = require("./bot");
const data = require("./alias/data");

//creating empty objects so i can make different twitch client/connected info for every user
let twitch = {};
let connected = {};
let info = data.get("default")

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
            //check if particular user connected already
            if(!connected[ctx.chat.id]) {
                //creating new client for him
                try {
                    twitch[ctx.chat.id] = bot.twitch(ctx.chat.id);
                    await twitch[ctx.chat.id].connect();
                    connected[ctx.chat.id] = true;

                    info = data.get(ctx.chat.id);
                    ctx.reply(`connected to twitch.tv/${info.channel} have fun chatting!`);
                    twitch[ctx.chat.id].on("message", (channel, user, message, self) => {
                        if(self) {
                            return
                        }

                        ctx.reply(`${user.username}: ${message}`);
                    });
                } catch {
                    ctx.reply("configurate your information property before connecting.");
                }
            }
            break;

        case "/disconnect":
            //check if particular user connected already
            if(connected[ctx.chat.id]) {
                try {
                    //and disconnecting his client from the channel
                    await twitch[ctx.chat.id].disconnect();
                    ctx.reply(`disconnected from twitch.tv/${info.channel}`);
                } catch {
                    ctx.reply("not connected to the channel");
                } finally {
                    connected[ctx.chat.id] = false;
                }
            } else {
                ctx.reply("not connected to the channel");
            }
            break;

        default:
            //sending messages to twitch chat
            if(connected[ctx.chat.id]) {
                info = data.get(ctx.chat.id);
                twitch[ctx.chat.id].say(info.channel, ctx.message.text);
                break;
            }
    }
});

bot.telegram.launch();