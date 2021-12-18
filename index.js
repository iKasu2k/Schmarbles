require('dotenv').config();

const MurmelBot = require('./src/bot');
const user = process.env.TWITCH_BOT_USERNAME;
const token = process.env.TWITCH_OAUTH_TOKEN;
const channels = JSON.parse(process.env.CHANNELS);

let bot = new MurmelBot({
    username: user,
    password: token,
    channels: channels
});

bot.initialize();