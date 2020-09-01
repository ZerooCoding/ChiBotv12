const Discord = require("discord.js");
const { Token } = require("./DataStore/Config/Config.json");
const { GiveawaysManager } = require("discord-giveaways");
const ascii = require("ascii-table");
const table = new ascii().setHeading('Servers', 'Connection Status');

const lib = require("./Core/EventLoader.js");
const bot = new Discord.Client();
lib.setup(bot);

module.exports = { bot: bot };

//Command Info
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.cooldowns = new Discord.Collection();

//MusicBot
bot.queue = new Map();

//Database
bot.mongoose = require("./database/mongoose");
bot.defaults = require("./database/databaseDefaults");
require("./database/functions")(bot)

//Declare myself as Owner of bot.
bot.Owner = "101789503634554880";

//Raffle Manager
bot.Raffle = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#51db8f",
        embedColorEnd: "#4ee32d",
        reaction: "🎉"
    }
});

['Command Loader'].forEach(handler => {
    require(`./Events/${handler}`)(bot);
});

bot.once("ready", () => {
    bot.guilds.cache.forEach((f) => {
        table.addRow(`${f.name}`, '✔ -> Connected');
    });
    console.log(table.toString());
});

bot.mongoose.init();
bot.login(Token);