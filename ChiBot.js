const Discord = require("discord.js");
const { Token, DefaultPrefix } = require("./DataStore/Config/Config.json");
const fs = require("fs");

const lib = require("./Core/EventLoader.js");
const bot = new Discord.Client();
lib.setup(bot);

module.exports = { bot: bot };

//Command Info
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.cooldowns = new Discord.Collection();

//Database
bot.mongoose = require("./database/mongoose");
bot.defaults = require("./database/databaseDefaults");
require("./database/functions")(bot)

//Temp Info
bot.Prefix = DefaultPrefix;
bot.Owner = "101789503634554880";

['Command Loader'].forEach(handler => {
    require(`./Events/${handler}`)(bot);
});

bot.once("ready", () => {
    console.log(`${bot.user.tag} Online and Ready in ${bot.guilds.cache.size} guilds.`);
});

bot.mongoose.init();
bot.login(Token);