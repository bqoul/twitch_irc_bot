require("dotenv").config();

const tmi = require("tmi.js");
const {Telegraf} = require("telegraf");
const fs = require("fs");

module.exports = {
    telegram: new Telegraf(process.env.BOT_TOKEN),
    twitch: (id) => {
        data = JSON.parse(fs.readFileSync(`data/${id}.json`));

        return new tmi.Client({
            options: { 
                debug: true,
            },
            connection: {
                reconnect: false,
            },
            identity: {
                username: data.username,
                password: data.oauth,
            },
            channels: [data.channel],
        });
    } 
}